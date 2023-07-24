import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Ride, RideStateEnum } from '../../../../api-client';
import { api } from '../../../../Config.ts';

const ActiveRide = () => {
  const [ride, setRide] = useState<Ride>();
  useEffect(() => {
    (async () => {
      setRide(await api.ride.getActiveRideForUser());
    })();
  }, []);

  const finishRide = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.Completed }
    });
    console.log('Ride completed');
  };

  return (
    <div className="w-full h-full absolute top-0 bg-gray-200 overflow-auto">
      {JSON.stringify(ride)}
      <Button onClick={finishRide}>Complete ride</Button>
    </div>
  );
};

export default withLayout(ActiveRide, { title: 'נסיעה פעילה', showLogoutButton: true });
