import React, { useMemo, useEffect, useState } from 'react';
import { Track } from 'livekit-client';
import { AnimatePresence, motion } from 'motion/react';
import {
  type TrackReference,
  useLocalParticipant,
  useTracks,
  useVoiceAssistant,
} from '@livekit/components-react';
import { cn } from '@/lib/utils';
import { AgentTile } from './agent-tile';
import { AvatarTile } from './avatar-tile';
import { VideoTile } from './video-tile';

const MotionVideoTile = motion.create(VideoTile);
const MotionAgentTile = motion.create(AgentTile);
const MotionAvatarTile = motion.create(AvatarTile);

const animationProps = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
  transition: {
    type: 'spring',
    stiffness: 675,
    damping: 75,
    mass: 1,
  },
};

const classNames = {
  grid: [
    'h-full w-full',
    'grid gap-x-2 place-content-center',
    'grid-cols-[1fr] grid-rows-[1fr]',
  ],
  agentChatOpenWithSecondTile: ['hidden'],
  agentChatOpenWithoutSecondTile: ['hidden'],
  agentChatClosed: ['hidden'],
  cameraFullScreen: [
    'col-start-1 row-start-1',
    'w-full h-full',
    'flex items-center justify-center relative' // Added relative
  ],
  secondTileChatOpen: ['hidden'],
  secondTileChatClosed: ['hidden'],
};

export function useLocalTrackRef(source: Track.Source) {
  const { localParticipant } = useLocalParticipant();
  const publication = localParticipant.getTrackPublication(source);
  const trackRef = useMemo<TrackReference | undefined>(
    () => (publication ? { source, participant: localParticipant, publication } : undefined),
    [source, publication, localParticipant]
  );
  return trackRef;
}

interface MediaTilesProps {
  chatOpen: boolean;
}

// JARVIS Overlay Component
function JarvisOverlay() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scanLinesPosition, setScanLinesPosition] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const scanInterval = setInterval(() => {
      setScanLinesPosition(prev => (prev + 20) % 100);
    }, 50);

    return () => {
      clearInterval(timeInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20"> {/* Increased z-index */}
      {/* Scan Lines Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          y: [`${scanLinesPosition}%`, `${scanLinesPosition + 100}%`],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          height: '20%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 200, 255, 0.1) 50%, transparent 99%)',
        }}
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='rgba(0, 200, 255, 0.3)' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Border Glow */}
      <div className="absolute inset-0 border-2 border-blue-400/30 shadow-[0_0_30px_rgba(0,200,255,0.3)] rounded-lg" />

      {/* Corner Elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400" />

      {/* HUD Elements */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="text-blue-400 font-mono text-sm font-bold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {currentTime.toLocaleTimeString()}
        </motion.div>
      </div>

      {/* Floating Data Points */}
      <motion.div
        className="absolute top-20 left-10 text-blue-300 font-mono text-xs"
        animate={{
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        SYSTEM ONLINE
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-blue-300 font-mono text-xs"
        animate={{
          y: [0, 10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
        }}
      >
        CAMERA ACTIVE
      </motion.div>

      {/* Pulse Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-blue-400 rounded-lg"
        animate={{
          opacity: [0, 0.5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Central Reticle */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-0.5 bg-blue-400 absolute top-1/2 transform -translate-y-1/2" />
        <div className="h-full w-0.5 bg-blue-400 absolute left-1/2 transform -translate-x-1/2" />
        <div className="w-2 h-2 border-2 border-blue-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Status Bars */}
      <div className="absolute bottom-6 left-6 right-6 flex gap-4">
        <motion.div
          className="h-1 bg-blue-400/50 rounded-full flex-1"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <div className="h-full bg-blue-400 rounded-full w-3/4" />
        </motion.div>
        <motion.div
          className="h-1 bg-blue-400/50 rounded-full flex-1"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.7 }}
        >
          <div className="h-full bg-blue-400 rounded-full w-1/2" />
        </motion.div>
      </div>
    </div>
  );
}

export function MediaTiles({ chatOpen }: MediaTilesProps) {
  const {
    state: agentState,
    audioTrack: agentAudioTrack,
    videoTrack: agentVideoTrack,
  } = useVoiceAssistant();
  const [screenShareTrack] = useTracks([Track.Source.ScreenShare]);
  const cameraTrack: TrackReference | undefined = useLocalTrackRef(Track.Source.Camera);

  const isCameraEnabled = cameraTrack && !cameraTrack.publication.isMuted;
  const isScreenShareEnabled = screenShareTrack && !screenShareTrack.publication.isMuted;
  const showFullScreenCamera = isCameraEnabled;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="relative h-full w-full">
        <div className={cn(classNames.grid)}>
          {/* Full Screen Camera with JARVIS Overlay */}
          {showFullScreenCamera && (
            <div className={cn(classNames.cameraFullScreen)}>
              <AnimatePresence>
                <MotionVideoTile
                  key="camera-fullscreen"
                  layoutId="camera-fullscreen"
                  {...animationProps}
                  trackRef={cameraTrack}
                  className="w-full h-full max-w-full max-h-full object-contain z-10 relative"
                />
              </AnimatePresence>
              
              {/* JARVIS Overlay - Pastikan ini muncul di atas video */}
              <JarvisOverlay />
            </div>
          )}

          {/* Screen Share PIP */}
          {isScreenShareEnabled && (
            <div className={cn([
              'fixed bottom-4 right-4 z-60',
              'w-1/4 h-auto max-w-xs'
            ])}>
              <MotionVideoTile
                key="screen-pip"
                layoutId="screen-pip"
                {...animationProps}
                trackRef={screenShareTrack}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Agent/Avatar Minimized */}
          {(agentAudioTrack || agentVideoTrack) && (
            <div className={cn([
              'fixed top-4 left-4 z-60',
              'w-24 h-24'
            ])}>
              <AnimatePresence>
                {!agentVideoTrack ? (
                  <MotionAgentTile
                    key="agent-minimized"
                    layoutId="agent-minimized"
                    {...animationProps}
                    state={agentState}
                    audioTrack={agentAudioTrack}
                    className="w-full h-full rounded-full border-2 border-blue-400 shadow-lg"
                  />
                ) : (
                  <MotionAvatarTile
                    key="avatar-minimized"
                    layoutId="avatar-minimized"
                    {...animationProps}
                    videoTrack={agentVideoTrack}
                    className="w-full h-full rounded-full object-cover border-2 border-blue-400 shadow-lg"
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}