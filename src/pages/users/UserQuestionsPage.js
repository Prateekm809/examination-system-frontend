import React, { useEffect, useState, useCallback } from "react";
import "./UserQuestionsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { fetchQuestionsByQuiz } from "../../actions/questionsActions";
import Question from "../../components/Question";
import Loader from "../../components/Loader";
import swal from "sweetalert";
import * as quizResultConstants from "../../constants/quizResultConstants";
import { submitQuiz } from "../../actions/quizResultActions";
import { fetchQuizzes } from "../../actions/quizzesActions";
import { useTimer } from "react-timer-hook";

const UserQuestionsPage = () => {
  Number.prototype.zeroPad = function () {
    return ("0" + this).slice(-2);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");
  const quizTitle = urlParams.get("quizTitle");
  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
  const [quiz, setQuiz] = useState(
    quizzes.filter((q) => q.quizId == quizId)[0]
  );
  const questionsReducer = useSelector((state) => state.questionsReducer);
  const [questions, setQuestions] = useState(questionsReducer.questions);
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.userId : null;
  const [timeRemaining, setTimeRemaining] = useState(questions.length * 2 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  let answers = {};

  const [copyAttempts, setCopyAttempts] = useState(() => {
    const saved = localStorage.getItem("copyAttempts");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [tabSwitchAttempts, setTabSwitchAttempts] = useState(() => {
    const saved = localStorage.getItem("tabSwitchAttempts");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [resizeAttempts, setResizeAttempts] = useState(() => {
    const saved = localStorage.getItem("resizeAttempts");
    return saved ? parseInt(saved, 10) : 0;
  });

  // React-timer-hook
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeRemaining);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => submitQuizHandler(true, "Time's up!"),
  });

  const submitQuizHandler = useCallback(
    (isAutoSubmit = false, reason = "") => {
      if (isSubmitted) {
        swal(
          "Already Submitted",
          "You have already submitted this quiz.",
          "info"
        );
        return;
      }

      const answers = JSON.parse(localStorage.getItem("answers"));

      const submitAction = () => {
        submitQuiz(dispatch, userId, quizId, answers, token).then((data) => {
          if (data.type === quizResultConstants.ADD_QUIZ_RESULT_SUCCESS) {
            swal(
              "Quiz Submitted!",
              `You scored ${data.payload.totalObtainedMarks} marks in ${quizTitle} quiz.`,
              "success"
            );
          } else {
            swal("Quiz Submitted", "Your answers have been recorded.", "info");
          }
          setIsSubmitted(true); // Update the submission status
          navigate("/quizResults");
        });
      };

      if (isAutoSubmit) {
        swal(
          "Quiz Auto-Submitted",
          `The quiz has been automatically submitted. Reason: ${reason}`,
          "warning"
        ).then(submitAction);
      } else {
        swal({
          title: "Are you sure?",
          text: "Once submitted, you will not be able to modify your answers!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willSubmit) => {
          if (willSubmit) {
            submitAction();
          }
        });
      }

      // Clear localStorage
      localStorage.removeItem("copyAttempts");
      localStorage.removeItem("tabSwitchAttempts");
      localStorage.removeItem("resizeAttempts");
      localStorage.removeItem("timeRemaining");
    },
    [dispatch, userId, quizId, quizTitle, token, navigate, isSubmitted]
  );

  const checkAndSubmitIfNeeded = useCallback(
    (attempts, type) => {
      if (attempts >= 3) {
        submitQuizHandler(true, `3 ${type} attempts detected`);
      }
    },
    [submitQuizHandler]
  );

  const handleCopy = useCallback(
    (e) => {
      e.preventDefault();
      const newAttempts = copyAttempts + 1;
      setCopyAttempts(newAttempts);
      localStorage.setItem("copyAttempts", newAttempts);
      swal(
        "Warning",
        `Copy attempt detected. You have made ${newAttempts} out of 3 allowed attempts.`,
        "warning"
      );
      checkAndSubmitIfNeeded(newAttempts, "copy");
    },
    [copyAttempts, checkAndSubmitIfNeeded]
  );

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      const newAttempts = tabSwitchAttempts + 1;
      setTabSwitchAttempts(newAttempts);
      localStorage.setItem("tabSwitchAttempts", newAttempts);
      swal(
        "Warning",
        `Tab switch detected. You have made ${newAttempts} out of 3 allowed attempts.`,
        "warning"
      );
      checkAndSubmitIfNeeded(newAttempts, "tab switch");
    }
  }, [tabSwitchAttempts, checkAndSubmitIfNeeded]);

  const handleResize = useCallback(() => {
    const newAttempts = resizeAttempts + 1;
    setResizeAttempts(newAttempts);
    localStorage.setItem("resizeAttempts", newAttempts);
    swal(
      "Warning",
      `Window resize detected. You have made ${newAttempts} out of 3 allowed attempts.`,
      "warning"
    );
    checkAndSubmitIfNeeded(newAttempts, "resize");
  }, [resizeAttempts, checkAndSubmitIfNeeded]);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");

    // Add event listeners
    document.addEventListener("copy", handleCopy);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);

    // Restore timer state
    const savedTime = localStorage.getItem("timeRemaining");
    if (savedTime) {
      const newTime = new Date();
      newTime.setSeconds(newTime.getSeconds() + parseInt(savedTime, 10));
      restart(newTime);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleCopy, handleVisibilityChange, handleResize, navigate, restart]);

  useEffect(() => {
    if (quizzes.length === 0) {
      fetchQuizzes(dispatch, token).then((data) => {
        const temp = data.payload;
        setQuizzes(temp);
        setQuiz(temp.filter((q) => q.quizId === quizId)[0]);
      });
    }
  }, [dispatch, quizId, quizzes.length, token]);

  useEffect(() => {
    fetchQuestionsByQuiz(dispatch, quizId, token).then((data) => {
      setQuestions(data.payload);
      setTimeRemaining(data.payload.length * 2 * 60);
    });
  }, [dispatch, quizId, token]);

  // Save timer state
  useEffect(() => {
    localStorage.setItem("timeRemaining", minutes * 60 + seconds);
  }, [minutes, seconds]);

  return (
    <div className="userQuestionsPage__container">
      <div className="userQuestionsPage__content">
        <h2>{`Questions: ${quizTitle}`}</h2>
        <div className="userQuestionsPage__content--options">
          <Button
            className="userQuestionsPage__content--button"
            onClick={() => submitQuizHandler()}
            disabled={isSubmitted} // Disable button if quiz is submitted
          >
            Submit Quiz
          </Button>
          <div className="userQuestionsPage__content--timer">
            <h4 style={{ marginTop: "18px" }}>
              {minutes.zeroPad()} : {seconds.zeroPad()}
            </h4>
            Timer
          </div>
        </div>
        <div className="userQuestionsPage__content--attempts">
          <p>Copy Attempts: {copyAttempts}/3</p>
          <p>Tab Switch Attempts: {tabSwitchAttempts}/3</p>
          <p>Resize Attempts: {resizeAttempts}/3</p>
        </div>
        {questions ? (
          questions.map((q, index) => (
            <Question key={index} number={index + 1} question={q} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default UserQuestionsPage;
