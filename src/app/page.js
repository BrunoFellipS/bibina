'use client'
import React, { useState, useEffect } from 'react';

function App() {
  const [timeDifference, setTimeDifference] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [colorIndex, setColorIndex] = useState(0);

  // 3 tons de rosa, lilás e roxo para o fundo
  const backgroundColors = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#D8BFD8', '#DDA0DD', '#EE82EE', '#9370DB', '#8A2BE2', '#6A5ACD'];

  useEffect(() => {
    const startDate = new Date('2020-05-13T00:00:00');

    const calculateTimeDifference = () => {
      const now = new Date();
      const diff = now - startDate;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeDifference({
        years,
        days,
        hours,
        minutes,
        seconds
      });
    };

    const changeBackgroundColor = () => {
      setColorIndex((prevIndex) => (prevIndex + 1) % backgroundColors.length);
    };

    calculateTimeDifference();
    changeBackgroundColor();

    const timeInterval = setInterval(calculateTimeDifference, 1000); // Atualiza a cada segundo
    const colorInterval = setInterval(changeBackgroundColor, 1000); // Troca de cor a cada segundo

    return () => {
      clearInterval(timeInterval);
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div style={{ ...styles.container, backgroundColor: backgroundColors[colorIndex] }}>
      <h1 style={styles.text}>
        AMANDO A BIBINA HÁ {timeDifference.years} anos, {timeDifference.days} dias, 
        {timeDifference.hours} horas, {timeDifference.minutes} minutos e {timeDifference.seconds} segundos
      </h1>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0', // será sobrescrito pelo background alternado
  },
  text: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#000', // Texto preto
    textAlign: 'center',
    backgroundColor: '#fff', // Fundo branco do texto
    padding: '20px',
    borderRadius: '10px'
  }
};

export default App;
