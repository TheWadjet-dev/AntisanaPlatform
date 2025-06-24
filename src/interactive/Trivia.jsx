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

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg text-center">
      {showResult ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">¡Trivia finalizada!</h2>
          <p className="text-lg">Tu puntuación: {score} / {questions.length}</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">{questions[current].question}</h2>
          <div className="flex flex-col gap-2">
            {questions[current].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`py-2 px-4 rounded-md border 
                  ${selected === option
                    ? option === questions[current].answer
                      ? 'bg-green-300 border-green-500'
                      : 'bg-red-300 border-red-500'
                    : 'bg-blue-100 hover:bg-blue-200'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
