const firebaseApp = require('../config/firebase')

const db = firebaseApp.database();
const getAllQuizQuestions = async (request,h) => {
    try {
      const snapshot = await firebaseApp.database().ref('/quiz').once('value');
      return snapshot.val();
    } catch (error) {
      console.error('Gagal mengambil data:', error);
      throw new Error('Gagal mengambil data dari Firebase');
    }
  };
  
  
  const saveQuizResult = async (uid, score, correctCount, totalQuestions) => {
    try {
        const userRef = db.ref(`users/${uid}`);
        const userSnapshot = await userRef.once('value');
        if (!userSnapshot.exists()) {
            console.log(`User with uid ${uid} does not exist. Creating new user entry...`);
            await userRef.set({
                createdAt: Date.now() 
            });

            console.log(`User with uid ${uid} created successfully.`);
        }
        const quizzesRef = userRef.child('quizzes').push(); 
        await quizzesRef.set({
            score,
            correctCount,
            totalQuestions,
            createdAt: Date.now() 
        });

        return ('berhasil menyimpan data');
    } catch (error) {
        console.error('Failed to save quiz result:', error);
        throw new Error('Failed to save quiz result');
    }
};
  
  
const verifyAnswer = async (request,h,uid) => {
    try {
      const data = request.payload
      const verificationResults = [];
      const snapshot = await firebaseApp.database().ref('quiz/questions/').once('value');
      const questions = snapshot.val();
    
    for (let i = 0; i < questions.length; i++) {
      const userAnswer = data[i].userAnswer;
      const questionId = data[i].questionId;
    
      const question = questions[i];
      const { imageUrl, options, questionText } = question;

      
      const isCorrect = (userAnswer === question.answer);
      const correctAnswer = question.answer;

      const verificationResult = {
        questionId,
        imageUrl,
        options,
        questionText,
        userAnswer,
        isCorrect,
        correctAnswer,
      };

      verificationResults.push(verificationResult);
    }
 
    const totalQuestions = verificationResults.length;
    const correctCount = verificationResults.filter(result => result.isCorrect).length;
    const score = Math.floor((correctCount / totalQuestions) * 100);
    await saveQuizResult(uid, score, correctCount, totalQuestions);
    return {
      verificationResults,
      score
    };
  } catch (error) {
    console.error('Gagal memverifikasi jawaban:', error);
    throw new Error('Gagal memverifikasi jawaban');
  }
};

const getResult = async (request,h,uid) => {
  try {
    const quizzesRef = db.ref(`/users/${uid}/quizzes`);
    const snapshot = await quizzesRef.once('value');
    const quizzes = snapshot.val();
    
    if (!quizzes) {
      return h.response({ message: `Tidak ada data hasil quiz untuk pengguna dengan ID ${userId}` }).code(404);
  }

  return h.response(quizzes).code(200);
} catch (error) {
  console.error('Gagal mengambil data hasil quiz:', error);
  return h.response({ error: 'Gagal mengambil data hasil quiz' }).code(500);
}
}

  module.exports = {
    getAllQuizQuestions,
    verifyAnswer,
    getResult
  };



