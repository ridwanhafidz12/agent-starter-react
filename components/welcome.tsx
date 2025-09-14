import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeProps {
  disabled: boolean;
  startButtonText: string;
  onStartCall: () => void;
}

export const Welcome = ({
  disabled,
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeProps) => {
  return (
    <section
      ref={ref}
      inert={disabled}
      className={cn(
        'fixed inset-0 mx-auto flex h-svh flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-blue-900 to-black',
        disabled ? 'z-10' : 'z-20'
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij48cGF0aCBkPSJNMzIgMEMxNC4zIDAgMCAxNC4zIDAgMzJzMTQuMyAzMiAzMiAzMiAzMi0xNC4zIDMyLTMyUzQ5LjcgMCAzMiAwem0wIDYwYy0xNS41IDAtMjgtMTIuNS0yOC0yOFMxNi41IDQgMzIgNHMyOCAxMi41IDI4IDI4LTEyLjUgMjgtMjggMjh6IiBmaWxsPSIjMDA3N2ZmIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-10"></div>
      
      {/* J.A.R.V.I.S Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-75 blur-xl animate-pulse"></div>
        <svg
          width="80"
          height="80"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue-400 relative z-10 mb-4 size-20 drop-shadow-glow"
        >
          <path
            d="M15 24V40C15 40.7957 14.6839 41.5587 14.1213 42.1213C13.5587 42.6839 12.7956 43 12 43C11.2044 43 10.4413 42.6839 9.87868 42.1213C9.31607 41.5587 9 40.7957 9 40V24C9 23.2044 9.31607 22.4413 9.87868 21.8787C10.4413 21.3161 11.2044 21 12 21C12.7956 21 13.5587 21.3161 14.1213 21.8787C14.6839 22.4413 15 23.2044 15 24ZM22 5C21.2044 5 20.4413 5.31607 19.8787 5.87868C19.3161 6.44129 19 7.20435 19 8V56C19 56.7957 19.3161 57.5587 19.8787 58.1213C20.4413 58.6839 21.2044 59 22 59C22.7956 59 23.5587 58.6839 24.1213 58.1213C24.6839 57.5587 25 56.7957 25 56V8C25 7.20435 24.6839 6.44129 24.1213 5.87868C23.5587 5.31607 22.7956 5 22 5ZM32 13C31.2044 13 30.4413 13.3161 29.8787 13.8787C29.3161 14.4413 29 15.2044 29 16V48C29 48.7957 29.3161 49.5587 29.8787 50.1213C30.4413 50.6839 31.2044 51 32 51C32.7956 51 33.5587 50.6839 34.1213 50.1213C34.6839 49.5587 35 48.7957 35 48V16C35 15.2044 34.6839 14.4413 34.1213 13.8787C33.5587 13.3161 32.7956 13 32 13ZM42 21C41.2043 21 40.4413 21.3161 39.8787 21.8787C39.3161 22.4413 39 23.2044 39 24V40C39 40.7957 39.3161 41.5587 39.8787 42.1213C40.4413 42.6839 41.2043 43 42 43C42.7957 43 43.5587 42.6839 44.1213 42.1213C44.6839 41.5587 45 40.7957 45 40V24C45 23.2044 44.6839 22.4413 44.1213 21.8787C43.5587 21.3161 42.7957 21 42 21ZM52 17C51.2043 17 50.4413 17.3161 49.8787 17.8787C49.3161 18.4413 49 19.2044 49 20V44C49 44.7957 49.3161 45.5587 49.8787 46.1213C50.4413 46.6839 51.2043 47 52 47C52.7957 47 53.5587 46.6839 54.1213 46.1213C54.6839 45.5587 55 44.7957 55 44V20C55 19.2044 54.6839 18.4413 54.1213 17.8787C53.5587 17.3161 52.7957 17 52 17Z"
            fill="currentColor"
            className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
          />
        </svg>
      </div>

      {/* J.A.R.V.I.S Text Display */}
      <div className="relative mb-6">
        <div className="text-4xl font-bold text-blue-400 font-mono mb-2 drop-shadow-glow">
          J.A.R.V.I.S
        </div>
        {/* <div className="text-blue-300 text-sm font-mono opacity-80">
          Just A Rather Very Intelligent System
        </div> */}
      </div>

      {/* Welcome Message */}
      <p className="text-blue-200 max-w-prose pt-1 leading-6 font-mono text-lg mb-8 drop-shadow-sm">
        Sistem siap untuk diaktifkan. Awaiting your command, Sir.
      </p>

      {/* Start Button with HUD Style */}
      <Button 
        variant="primary" 
        size="lg" 
        onClick={onStartCall} 
        className="mt-6 w-72 font-mono bg-gradient-to-r from-blue-600 to-cyan-500 border-2 border-blue-400 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/60 text-white font-bold py-4 text-lg"
      >
        <span className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]">
          {startButtonText}
        </span>
      </Button>

      {/* HUD Elements */}
      <div className="absolute bottom-8 left-8">
        <div className="hud-line"></div>
        <div className="text-blue-300 text-xs font-mono opacity-60">SYS_READY</div>
      </div>
      
      <div className="absolute bottom-8 right-8">
        <div className="hud-line"></div>
        <div className="text-blue-300 text-xs font-mono opacity-60">V1.0.0</div>
      </div>

      {/* Animated Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanlines opacity-10"></div>
      </div>

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.6));
        }
        .hud-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #60a5fa, transparent);
          margin-bottom: 4px;
        }
        .scanlines {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(59, 130, 246, 0.03) 51%
          );
          background-size: 100% 4px;
          animation: scan 8s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};