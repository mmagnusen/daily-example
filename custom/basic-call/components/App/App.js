import React, { useMemo, useEffect } from 'react';
import ExpiryTimer from '@custom/shared/components/ExpiryTimer';
import { useCallState } from '@custom/shared/contexts/CallProvider';
import { useParticipants } from '@custom/shared/contexts/ParticipantsProvider';
import { useCallUI } from '@custom/shared/hooks/useCallUI';

import PropTypes from 'prop-types';
import Room from '../Call/Room';
import { Asides } from './Asides';
import { Modals } from './Modals';

export const App = ({ customComponentForState }) => {
  const { roomExp, state } = useCallState();
  const {allParticipants, participantCount, participants} = useParticipants()

  const componentForState = useCallUI({
    state,
    room: <Room />,
    ...customComponentForState,
  });

  useEffect(() => {
    console.log('HOOKS', {allParticipants, participantCount, participants})
    }, [allParticipants, participantCount, participants])

    
  // Memoize children to avoid unnecessary renders from HOC
  return useMemo(
    () => (
      <>
        {roomExp && <ExpiryTimer expiry={roomExp} />}
        <div className="app">
          {componentForState()}
          <Modals />
          <Asides />
          <style jsx>{`
            color: white;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;

            .loader {
              margin: 0 auto;
            }
          `}</style>
        </div>
      </>
    ),
    [componentForState, roomExp]
  );
};

App.propTypes = {
  customComponentForState: PropTypes.any,
};

export default App;
