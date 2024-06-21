const { getAllQuizQuestions,verifyAnswer, getResult} = require('../handlers/quizHandler');


const getQuizQuestions = async (request, h) => {
    try {
        const quizData = await getAllQuizQuestions(); 
        const response = {
            quiz: {
                questions: quizData.questions.map(question => ({
                    id: question.id,
                    imageUrl: question.imageUrl,
                    options: question.options,
                    questionText: question.questionText
                }))
            }
        };

        return h.response(response).code(200)
    } catch (err) {
        console.error('Error:', err);
        return h.response({ error: 'Gagal mengambil data soal' }).code(500);
    }
};


const verifyUserAnswer = async (request, h,uid) => {
    try {

      const data = await verifyAnswer(request, h,uid);
  
    
      return h.response({message:"Jawaban berhasil diverifikasi",data}).code(200);
    } catch (error) {
      console.error('Gagal memproses jawaban:', error);
      return h.response('Gagal memproses jawaban').code(500);
    }
  };


  const getUserResult = async (request, h,uid) => {
    try {

      const response = await getResult(request, h,uid);
  
    
      return h.response(response).code(200);
    } catch (error) {
      console.error('Gagal memproses jawaban:', error);
      return h.response('Gagal memgambil data hasil user').code(500);
    }
  };

module.exports = {
    getQuizQuestions,
    verifyUserAnswer,
    getUserResult
};
