import { useState } from 'react'

const questions = [
  {
    question: "¿Dónde se encuentra el ecosistema Antisana?",
    options: ["Perú", "Ecuador", "Colombia", "Bolivia"],
    answer: "Ecuador"
  },
  {
    question: "¿Qué tipo de ecosistema predomina en el Antisana?",
    options: ["Selva tropical", "Desierto", "Páramo", "Manglar"],
    answer: "Páramo"
  },
  {
    question: "¿Cuál de estos animales es típico del Antisana?",
    options: ["Cóndor andino", "Jaguar", "Tiburón", "Oso polar"],
    answer: "Cóndor andino"
  }
]

export default function Trivia() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (option) => {
    setSelected(option)
    if (option === questions[current].answer) {
      setScore(score + 1)
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1)
        setSelected(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const resetTrivia = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setShowResult(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        {showResult ? (
          <div className="text-center">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-700">¡Trivia finalizada!</h2>
              <div className="text-6xl md:text-8xl mb-4">
                {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '📚'}
              </div>
              <p className="text-xl md:text-2xl font-semibold mb-2">
                Tu puntuación: <span className="text-blue-600">{score}</span> / {questions.length}
              </p>
              <p className="text-gray-600 mb-6">
                {score === questions.length 
                  ? '¡Perfecto! Eres un experto en el ecosistema Antisana' 
                  : score >= questions.length / 2 
                    ? '¡Bien hecho! Tienes buenos conocimientos' 
                    : 'Sigue aprendiendo sobre este increíble ecosistema'}
              </p>
            </div>
            <button
              onClick={resetTrivia}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Pregunta {current + 1} de {questions.length}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  Puntuación: {score}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center text-gray-800">
              {questions[current].question}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {questions[current].options.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={selected !== null}
                  className={`py-3 px-4 md:py-4 md:px-6 rounded-lg border-2 font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed
                    ${selected === option
                      ? option === questions[current].answer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-red-100 border-red-500 text-red-800'
                      : selected === null
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 text-blue-800'
                        : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                >
                  <span className="font-semibold text-xs text-gray-400 mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
