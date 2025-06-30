import { useState, useEffect } from 'react'
import triviaData from '../data/triviaQuestions.json'

export default function Trivia() {
  const [questions, setQuestions] = useState([])
  const [categories, setCategories] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    // Cargar datos del JSON
    setCategories(triviaData.categories)
    setQuestions(triviaData.questions)
  }, [])

  const getFilteredQuestions = () => {
    if (selectedCategory === 'all') {
      return questions
    }
    return questions.filter(q => q.category === selectedCategory)
  }

  const startGame = () => {
    const filteredQuestions = getFilteredQuestions()
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffled.slice(0, Math.min(10, shuffled.length))) // Máximo 10 preguntas
    setGameStarted(true)
    setCurrent(0)
    setScore(0)
    setTotalPoints(0)
    setSelected(null)
    setShowResult(false)
    setShowExplanation(false)
    setCorrectAnswers([])
  }

  const handleAnswer = (option) => {
    setSelected(option)
    const isCorrect = option === questions[current].answer
    
    if (isCorrect) {
      setScore(score + 1)
      setTotalPoints(totalPoints + questions[current].points)
      setCorrectAnswers([...correctAnswers, questions[current].id])
    }
    
    // Mostrar explicación después de responder
    setTimeout(() => {
      setShowExplanation(true)
    }, 500)
  }

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      setSelected(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const resetTrivia = () => {
    setGameStarted(false)
    setSelectedCategory('all')
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'facil': return 'bg-green-100 text-green-800 border-green-300'
      case 'medio': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'dificil': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getCategoryColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-800 border-green-300',
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      blue: 'bg-blue-100 text-blue-800 border-blue-300',
      cyan: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      purple: 'bg-purple-100 text-purple-800 border-purple-300',
      orange: 'bg-orange-100 text-orange-800 border-orange-300'
    }
    return colors[color] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return "🎉 ¡INCREÍBLE! Eres un experto del Antisana"
    if (percentage >= 80) return "🌟 ¡EXCELENTE! Sabes mucho sobre el Antisana"
    if (percentage >= 60) return "👍 ¡MUY BIEN! Tienes buenos conocimientos"
    if (percentage >= 40) return "📚 ¡BIEN! Sigue aprendiendo sobre el Antisana"
    return "🌱 ¡INTENTA DE NUEVO! Cada intento te hace más inteligente"
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 border-t-4 border-blue-500">
        
        {/* Pantalla de inicio con selección de categorías */}
        {!gameStarted ? (
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
                🧠 Trivia del Antisana 🧠
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                ¡Pon a prueba tus conocimientos sobre el ecosistema Antisana!
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">📚 Elige tu categoría:</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'all' 
                        ? 'bg-blue-100 border-blue-500 text-blue-800 shadow-lg' 
                        : 'bg-white border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">🌟</div>
                    <h3 className="font-bold">Todas las Categorías</h3>
                    <p className="text-sm text-gray-600">Pregunta mixta de todo</p>
                  </button>
                  
                  {Object.entries(categories).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === key 
                          ? `${getCategoryColor(category.color)} shadow-lg` 
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="font-bold text-sm">{category.name}</h3>
                      <p className="text-xs text-gray-600">
                        {triviaData.questions.filter(q => q.category === key).length} preguntas
                      </p>
                    </button>
                  ))}
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 Cómo funciona:</strong> Responde correctamente para ganar puntos. 
                    Las preguntas fáciles valen 10 puntos, las medianas 15 y las difíciles 20.
                  </p>
                </div>
              </div>
              
              <button
                onClick={startGame}
                disabled={questions.length === 0}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                🚀 ¡Empezar Trivia!
                {selectedCategory !== 'all' && (
                  <span className="block text-sm mt-1">
                    ({getFilteredQuestions().length} preguntas disponibles)
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : showResult ? (
          <div className="text-center">
            <div className="mb-8">
              <div className="text-8xl md:text-9xl mb-6 animate-bounce">
                {score === questions.length ? '🎉' : score >= questions.length * 0.8 ? '🌟' : score >= questions.length * 0.6 ? '👍' : score >= questions.length * 0.4 ? '�' : '🌱'}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-700">
                {getScoreMessage()}
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6">
                <p className="text-xl md:text-2xl font-semibold mb-2">
                  Respuestas correctas: <span className="text-blue-600">{score}</span> / {questions.length}
                </p>
                <p className="text-lg md:text-xl font-semibold mb-4">
                  Puntos totales: <span className="text-green-600">{totalPoints}</span>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${(score / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-700 text-sm md:text-base">
                  {Math.round((score / questions.length) * 100)}% correcto
                </p>
              </div>
              
              {score > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-yellow-800 mb-2">🏆 ¡Lo que aprendiste hoy!</h3>
                  <p className="text-sm text-yellow-700">
                    Ahora sabes más sobre el Antisana, la laguna La Mica, y cómo llega el agua limpia a tu casa. 
                    ¡Sigue explorando la plataforma para aprender más!
                  </p>
                </div>
              )}
            </div>
            
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetTrivia}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  🔄 Nueva trivia
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    startGame()
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  🎲 Trivia aleatoria
                </button>
                <button
                  onClick={() => window.location.href = '/about'}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  📚 Aprender más
                </button>
              </div>
          </div>
        ) : (
          <>
            {/* Header con progreso */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">
                    Pregunta {current + 1} de {questions.length}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(questions[current].difficulty)}`}>
                    {questions[current].difficulty} ({questions[current].points} pts)
                  </span>
                  {selectedCategory !== 'all' && (
                    <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(categories[questions[current].category]?.color)}`}>
                      {categories[questions[current].category]?.icon} {categories[questions[current].category]?.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-blue-600">
                    🏆 Correctas: {score}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    ⭐ Puntos: {totalPoints}
                  </span>
                </div>
              </div>
              
              {/* Barra de progreso mejorada */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                >
                  <span className="text-xs text-white font-bold">
                    {Math.round(((current + 1) / questions.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
            
            {/* Pregunta */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center text-gray-800 leading-relaxed">
                {questions[current].question}
              </h2>
            </div>
            
            {/* Opciones de respuesta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {questions[current].options.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={selected !== null}
                  className={`py-4 px-6 rounded-xl border-2 font-medium text-base transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed relative overflow-hidden
                    ${selected === option
                      ? option === questions[current].answer
                        ? 'bg-green-100 border-green-500 text-green-800 shadow-lg'
                        : 'bg-red-100 border-red-500 text-red-800 shadow-lg'
                      : selected !== null && option === questions[current].answer
                        ? 'bg-green-50 border-green-400 text-green-700'
                        : selected === null
                          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-400 text-blue-800 hover:shadow-md'
                          : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center font-bold text-sm mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-left">{option}</span>
                    {selected === option && (
                      <span className="ml-2 text-2xl">
                        {option === questions[current].answer ? '✅' : '❌'}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Explicación didáctica */}
            {showExplanation && (
              <div className="mb-6 animate-fadeIn">
                <div className={`rounded-xl p-6 border-2 ${selected === questions[current].answer ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">
                      {selected === questions[current].answer ? '🎉' : '💡'}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">
                        {selected === questions[current].answer ? '¡Correcto!' : '¡Aprendamos juntos!'}
                      </h3>
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {questions[current].explanation}
                      </p>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-yellow-400">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-yellow-600">💡 Dato curioso:</span> {questions[current].funFact}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={nextQuestion}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      {current + 1 < questions.length ? '➡️ Siguiente pregunta' : '🏁 Ver resultados'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
