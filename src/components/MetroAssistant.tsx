import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Train, ArrowRight, CheckCircle2, Circle, Radio, Volume2, 
  Languages, MapPin, Menu, Settings, HelpCircle, Phone, 
  Bell, User, LogOut, Info, Shield, MessageSquare,
  Navigation, Clock, CreditCard, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { metroRoutes, stations } from '../data/metro';

export default function MetroAssistant() {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [screen, setScreen] = useState<'home' | 'tracking'>('home');
  const [isHindi, setIsHindi] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [route, setRoute] = useState<string[]>([]);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getRoute = (src: string, dest: string) => {
    const list = Object.keys(metroRoutes);
    const s = list.indexOf(src);
    const d = list.indexOf(dest);
    if (s <= d) return list.slice(s, d + 1);
    return list.slice(d, s + 1).reverse();
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isHindi ? 'hi-IN' : 'en-US';
    utterance.pitch = 1.0;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleStartJourney = () => {
    if (!source || !destination || source === destination) return;
    const calculatedRoute = getRoute(source, destination);
    setRoute(calculatedRoute);
    setCurrentIndex(0);
    setScreen('tracking');
  };

  useEffect(() => {
    if (screen === 'tracking' && route.length > 0) {
      const initialText = isHindi 
        ? `आपकी यात्रा शुरू हो गई है। अगला स्टेशन ${route[0]} है` 
        : `Journey started. Next station is ${route[0]}`;
      speak(initialText);

      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < route.length - 1) {
            const nextIndex = prev + 1;
            const nextText = isHindi 
              ? `अगला स्टेशन ${route[nextIndex]} है` 
              : `Next station is ${route[nextIndex]}`;
            speak(nextText);
            return nextIndex;
          } else {
            const reachedText = isHindi 
              ? "आप अपनी मंज़िल पर पहुँच गए हैं" 
              : "You have reached your destination";
            speak(reachedText);
            if (timerRef.current) clearInterval(timerRef.current);
            return prev;
          }
        });
      }, 6000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.speechSynthesis.cancel();
    };
  }, [screen, route, isHindi]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6">
      <div className="flex items-center gap-4 px-4 mb-8">
        <Avatar className="h-12 w-12 border-2 border-blue-500/20">
          <AvatarImage src="https://picsum.photos/seed/user/100/100" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-lg">John Doe</h3>
          <p className="text-xs text-slate-400">Frequent Traveler</p>
        </div>
      </div>

      <div className="space-y-1 px-2">
        <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl">
          <User className="w-5 h-5 text-blue-400" />
          Profile
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl">
          <CreditCard className="w-5 h-5 text-blue-400" />
          Smart Card
          <Badge className="ml-auto bg-blue-500/20 text-blue-400 border-none">₹450</Badge>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl">
          <Star className="w-5 h-5 text-blue-400" />
          Favorite Routes
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl">
          <Clock className="w-5 h-5 text-blue-400" />
          Travel History
        </Button>
      </div>

      <Separator className="my-6 bg-white/5" />

      <div className="space-y-4 px-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Settings</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium">Notifications</span>
          </div>
          <Switch checked={isNotificationsEnabled} onCheckedChange={setIsNotificationsEnabled} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium">Hindi Voice</span>
          </div>
          <Switch checked={isHindi} onCheckedChange={setIsHindi} />
        </div>
      </div>

      <div className="mt-auto px-2 space-y-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl text-slate-400 hover:text-white">
              <Phone className="w-5 h-5" />
              Contact Support
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-dark border-white/10">
            <DialogHeader>
              <DialogTitle>Contact Support</DialogTitle>
              <DialogDescription>
                Need help with your journey? Our team is here for you 24/7.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What do you need help with?" className="bg-white/5 border-white/10" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Describe your issue..." className="bg-white/5 border-white/10 min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-blue-600 hover:bg-blue-500 w-full">Send Message</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10">
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glass-dark border-r-white/10 p-0 w-80">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Train className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">MetroSmart</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950" />
          </Button>
          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src="https://picsum.photos/seed/user/100/100" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </nav>

      <main className="pt-20 pb-12">
        <AnimatePresence mode="wait">
          {screen === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container max-w-4xl mx-auto px-6"
            >
              {/* Hero Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 pt-8">
                <div className="space-y-6">
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                    Next Gen Metro Assistant
                  </Badge>
                  <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                    Travel Smarter, <br />
                    <span className="text-blue-500">Not Harder.</span>
                  </h1>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                    Real-time tracking, voice announcements, and smart routing all in one place. Your commute just got an upgrade.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                      <Navigation className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">Live GPS</span>
                    </div>
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                      <Volume2 className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">Voice Alerts</span>
                    </div>
                  </div>
                </div>

                <Card className="glass border-none shadow-2xl shadow-blue-500/10 overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Plan Your Journey</CardTitle>
                    <CardDescription>Select your stations to begin tracking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-slate-500 ml-1">Source</Label>
                      <Select onValueChange={setSource} value={source}>
                        <SelectTrigger className="bg-white/5 border-white/10 h-14 text-lg rounded-xl">
                          <SelectValue placeholder="Select Source" />
                        </SelectTrigger>
                        <SelectContent className="glass-dark border-white/10">
                          {stations.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-slate-500 ml-1">Destination</Label>
                      <Select onValueChange={setDestination} value={destination}>
                        <SelectTrigger className="bg-white/5 border-white/10 h-14 text-lg rounded-xl">
                          <SelectValue placeholder="Select Destination" />
                        </SelectTrigger>
                        <SelectContent className="glass-dark border-white/10">
                          {stations.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handleStartJourney}
                      disabled={!source || !destination || source === destination}
                      className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 rounded-xl"
                    >
                      START JOURNEY
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white/5 border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="mb-4 p-3 rounded-xl bg-blue-500/10 w-fit group-hover:bg-blue-500/20 transition-colors">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-bold mb-2">Nearby Stations</h3>
                    <p className="text-sm text-slate-400">Find the closest metro station to your current location.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="mb-4 p-3 rounded-xl bg-purple-500/10 w-fit group-hover:bg-purple-500/20 transition-colors">
                      <MessageSquare className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-bold mb-2">Live Chat</h3>
                    <p className="text-sm text-slate-400">Get instant help from our support team via live chat.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="mb-4 p-3 rounded-xl bg-green-500/10 w-fit group-hover:bg-green-500/20 transition-colors">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="font-bold mb-2">Safety First</h3>
                    <p className="text-sm text-slate-400">Emergency SOS and safety guidelines for your journey.</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="container max-w-md mx-auto px-6"
            >
              <div className="flex items-center justify-between mb-8">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setScreen('home')} 
                  className="rounded-full gap-2 text-slate-400 hover:text-white"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Stop Journey
                </Button>
                <Badge variant="outline" className="border-blue-500/20 text-blue-400">
                  {currentIndex + 1} / {route.length} Stations
                </Badge>
              </div>

              <div className="relative h-16 mb-8 overflow-hidden bg-slate-900/50 rounded-2xl border border-white/5">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2"
                >
                  <Train className="w-10 h-10 text-blue-400" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-[2px] bg-white/5 mx-8" />
                </div>
              </div>

              <Card className="glass border-none mb-8 overflow-hidden shadow-2xl shadow-blue-500/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-mono text-xs uppercase tracking-widest">
                      {metroRoutes[route[0]]?.line || "Metro Line"}
                    </span>
                    <div className="flex items-center gap-1 text-green-400">
                      <Radio className="w-3 h-3 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase">Live Tracking</span>
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold mt-1">
                    {route[currentIndex]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Platform</p>
                      <p className="text-2xl font-bold font-mono">{metroRoutes[route[0]]?.platform || "-"}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Stops Left</p>
                      <p className="text-2xl font-bold font-mono">{route.length - 1 - currentIndex}</p>
                    </div>
                  </div>
                  <div className="mt-8 space-y-3">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>Journey Progress</span>
                      <span>{Math.round(((currentIndex + 1) / route.length) * 100)}%</span>
                    </div>
                    <Progress value={((currentIndex + 1) / route.length) * 100} className="h-3 bg-slate-800" />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4 pb-12">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Route Timeline</h4>
                <div className="space-y-4">
                  {route.map((station, i) => {
                    const isPast = i < currentIndex;
                    const isCurrent = i === currentIndex;
                    return (
                      <motion.div
                        key={station}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-start gap-4 p-5 rounded-2xl transition-all ${
                          isCurrent ? 'bg-blue-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/5' : 'opacity-40'
                        }`}
                      >
                        <div className="mt-1 relative">
                          {isPast ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          ) : isCurrent ? (
                            <div className="relative">
                              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" />
                              <Circle className="w-6 h-6 text-blue-400 fill-blue-400/20" />
                            </div>
                          ) : (
                            <Circle className="w-6 h-6 text-slate-700" />
                          )}
                          {i < route.length - 1 && (
                            <div className={`absolute top-7 left-3 w-[2px] h-8 -translate-x-1/2 ${
                              isPast ? 'bg-green-500/50' : 'bg-slate-800'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-bold ${isCurrent ? 'text-white text-xl' : 'text-slate-400'}`}>
                            {station}
                          </p>
                          {isCurrent && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="flex items-center gap-2 mt-2"
                            >
                              <div className="flex gap-1">
                                <div className="w-1 h-3 bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-1 h-3 bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-1 h-3 bg-blue-400 animate-bounce" />
                              </div>
                              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                                Announcing Station
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
