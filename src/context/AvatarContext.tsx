// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { AVATARS, AvatarConfig } from '../lib/avatarData';

// interface AvatarContextType {
//   selectedAvatar: AvatarConfig;
//   setSelectedAvatar: (avatar: AvatarConfig) => void;
// }

// const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

// export const AvatarProvider = ({ children }: { children: ReactNode }) => {
//   // Default to the first avatar (e.g., Ninja/Hades)
//   const [selectedAvatar, setSelectedAvatar] = useState<AvatarConfig>(AVATARS[0]);

//   return (
//     <AvatarContext.Provider value={{ selectedAvatar, setSelectedAvatar }}>
//       {children}
//     </AvatarContext.Provider>
//   );
// };

// export const useAvatar = () => {
//   const context = useContext(AvatarContext);
//   if (!context) {
//     throw new Error('useAvatar must be used within an AvatarProvider');
//   }
//   return context;
// };

// src/contexts/AvatarContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AVATARS, AvatarConfig } from '../lib/avatarData';
import { useAuth } from '../contexts/AuthContext';

interface AvatarContextType {
  selectedAvatar: AvatarConfig;
  setSelectedAvatar: (avatar: AvatarConfig) => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser, userProfile, userRole } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarConfig>(AVATARS[0]);

  useEffect(() => {
    // Only run for patients (therapists don't have avatars)
    if (userRole !== "patient" || !userProfile) {
      setSelectedAvatar(AVATARS[0]);
      return;
    }

    // Type guard: ensure userProfile has patient fields
    if ('selected_avatar_id' in userProfile && userProfile.selected_avatar_id) {
      const savedId = userProfile.selected_avatar_id;
      const matchingAvatar = AVATARS.find((avatar) => avatar.id === savedId);

      if (matchingAvatar) {
        setSelectedAvatar(matchingAvatar);
      } else {
        // Invalid or deleted ID → fallback
        setSelectedAvatar(AVATARS[0]);
      }
    } else {
      // No avatar selected yet → default
      setSelectedAvatar(AVATARS[0]);
    }
  }, [userProfile, userRole]); // Re-run when profile loads or user changes

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