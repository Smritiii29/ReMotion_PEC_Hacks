import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AVATARS, AvatarConfig } from '../lib/avatarData';

interface AvatarContextType {
  selectedAvatar: AvatarConfig;
  setSelectedAvatar: (avatar: AvatarConfig) => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
  // Default to the first avatar (e.g., Ninja/Hades)
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarConfig>(AVATARS[0]);

  return (
    <AvatarContext.Provider value={{ selectedAvatar, setSelectedAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};