import { useState,useEffect } from 'react'
import Header from './components/Header'
import Timerorspeed from './components/Timerorspeed'
import Restart from './components/Restart'
import Gameboard from './components/Gameboard'
import Settingbar from './components/Settingsbar'
import Results from './components/Results'

function App() {
    const words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also';
    const wordsArray = words.split(' ');
    const getRandomWord = () => wordsArray[Math.floor(Math.random() * wordsArray.length)];
  
    const newWords = Array.from({ length: 200 }, getRandomWord);
  
    const getStoredValue = (key,defaultValue) => {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    };

    const [wordList, setWordList] = useState(newWords);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [initialTime,setInitialTime] = useState(getStoredValue("initialTime",30));
    const [time,setTime] = useState(initialTime);
    const [theme,setTheme] = useState(getStoredValue("theme",'Dark'));
    const [timerRunning,setTimerRunning] = useState(false);
    const [letterStates, setLetterStates] = useState([]);
    const [timerVisible,setTimerVisible] = useState(false);
    const [correct,setCorrect] = useState(0);
    const [incorrect,setIncorrect] = useState(0);

    const startNewGame = () => {  
      const newWords1 = Array.from({ length: 200 }, getRandomWord);
      setWordList(newWords1);
      setCurrentWordIndex(0);
      setCurrentLetterIndex(0);
      setLetterStates([]);
      setTimerRunning(false);
      setTimerVisible(false);
      setTime(initialTime);
    };

    function startTimer(){
      setTimerVisible(true);
      setTimerRunning(true);
    }

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('initialTime', JSON.stringify(initialTime));
    }, [initialTime]);

    function getWPM(){
      const correctWords = letterStates.filter((wordState)=>{
          return wordState && wordState.every((letterState) => letterState === "correct");
      }).length;
      return correctWords > 1 ? Math.round((correctWords) * ((60)/initialTime)) : 0;
    }

    function getRawSpeed(){
      return currentWordIndex > 1 ? Math.round(currentWordIndex * ((60)/initialTime)) : 0; 
    }

    function getAccuracy(){
      return ((correct/(correct+incorrect))*100).toFixed(2);
    }

    useEffect(()=>{
      if(time > 0 && timerRunning){
          const timer = setInterval(()=>{
              setTime((prev) => Math.max(prev - 1,0));

          },1000);
          return () => clearInterval(timer);
      }
    },[time,timerRunning]);

    useEffect(() => {
      setTime(initialTime);
    }, [initialTime]);    

  return (
    <main className={`${theme === "Dark" ? "bg-zinc-900": "bg-gray-50"} min-h-screen px-15 py-5`}>
      <Header 
        theme={theme}
      />
      <div className='flex justify-center items-center min-h-[6rem]'>
        {!timerRunning && <Settingbar 
          initialTime={initialTime}
          setInitialTime={setInitialTime}
          time={time}
          setTime={setTime}
          theme={theme}
          setTheme={setTheme}
          startNewGame={startNewGame}
        />}
      </div>
      <div className='px-20 mb-4 min-h-[40px]'>
          {timerVisible && <Timerorspeed 
            time={time}
            getWPM={getWPM}
            timerRunning={timerRunning}
            setTimerRunning={setTimerRunning}
            theme={theme}
          />}
      </div>
      {time > 0 ? 
        <Gameboard 
          wordList={wordList} 
          setWordList={setWordList} 
          letterStates={letterStates}
          setLetterStates={setLetterStates}
          currentWordIndex={currentWordIndex} 
          currentLetterIndex={currentLetterIndex} 
          setCurrentWordIndex={setCurrentWordIndex} 
          setCurrentLetterIndex={setCurrentLetterIndex} 
          startNewGame={startNewGame}
          theme={theme}
          setTheme={setTheme}
          startTimer={startTimer}
          time = {time}
          correct={correct}
          setCorrect={setCorrect}
          incorrect={incorrect}
          setIncorrect={setIncorrect}
        /> : 
        <Results
          getWPM={getWPM}
          initialTime={initialTime} 
          getRawSpeed={getRawSpeed} 
          theme={theme}
          getAccuracy={getAccuracy}
        />}
      <div className='flex flex-col justify-center items-center'>
        <Restart 
          onRestart={startNewGame}
          theme={theme}
        />
      </div>
    </main>
  )
}

export default App
