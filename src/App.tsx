import MetroAssistant from './components/MetroAssistant';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function App() {
  return (
    <TooltipProvider>
      <main className="min-h-screen">
        <MetroAssistant />
      </main>
    </TooltipProvider>
  );
}
