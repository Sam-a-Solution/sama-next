import { useCallback, useEffect, useRef, useState } from 'react';

const useTimer = () => {
  const [ms, setMs] = useState(0);
  const [tick, setTick] = useState(0);

  const interval = 1000;
  const startTime = useRef(Date.now());
  const expectedTime = useRef(startTime.current + interval);
  const tickRef = useRef<NodeJS.Timer>();

  const runTick = useCallback((tick: number) => {
    setTick(tick);
    const drift = Date.now() - expectedTime.current;
    const addTick = tick + 1;
    expectedTime.current += interval;
    tickRef.current = setTimeout(() => runTick(addTick), interval - drift);
  }, []);

  const stopTimer = useCallback(() => {
    setMs(0);
  }, []);

  const setUseTimer = useCallback(
    (ms: number) => {
      if (tickRef.current) clearTimeout(tickRef.current);
      expectedTime.current = Date.now(); // -1000;
      setMs(ms);
      runTick(tick);
    },
    [runTick, tick],
  );

  useEffect(() => {
    setMs((prev) => prev - interval);
    console.log('tick');
  }, [tick]);

  useEffect(() => {
    if (ms === 0 && tickRef.current) clearTimeout(tickRef.current);
  }, [ms]);

  const days = getDays(ms);
  const hours = getHours(ms);
  const minutes = getMinutes(ms);
  const seconds = getSeconds(ms);

  return { ms, days, hours, minutes, seconds, stopTimer, setUseTimer, setMs };
};

export default useTimer;

const getDays = (ms: number) =>
  ms < 0 ? 0 : Math.floor(ms / (1000 * 60 * 60 * 24));
const getHours = (ms: number) =>
  ms < 0 ? 0 : Math.floor((ms / (1000 * 60 * 60)) % 24);
const getMinutes = (ms: number) =>
  ms < 0 ? 0 : Math.floor((ms / (1000 * 60)) % 60);
const getSeconds = (ms: number) => (ms < 0 ? 0 : Math.floor((ms / 1000) % 60));
