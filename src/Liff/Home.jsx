import React, { useState, useEffect } from "react";
import ArrowB from "../assets/arrow.png";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import liff from "@line/liff";
import Loading from "./Loading";
import LoadingError from "./LoadingError";
import Generate from "./Generate";
import Option from "./Option";
import HomeLoading from "./HomeLoading";
const Home = () => {
    const [progress, setProgress] = useState(1);
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps] = useState(11);
    const [isGenerate, setIsGenerate] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [currentInput, setCurrentInput] = useState("");
    const [showAdvice, setShowAdvice] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [optionComponent, setOptionComponent] = useState(false)
    const [prompt, setPrompt] = useState("")
    const [questionList, setQuestionList] = useState([])
    const [writingAdvice, setWritingAdvice] = useState([])
    console.log(progress)
    const maxInput = 100;
    const [formData, setFormData] = useState({
        userId: null,
        displayName: '',
        Question_1: '',
        Question_2: '',
        Question_3: '',
        Question_4: '',
        Question_5: '',
        Question_6: '',
        Question_7: '',
        Question_8: '',
        Question_9: '',
        Question_10: '',
        Question_11: '',
    });
    const [userId, setUserId] = useState(null);

    const options = [
        "営業力",
        "営業知識",
        "応用力",
        "課題認識力",
        "企画力",
        "危機管理能力",
        "気配り",
        "客観性",
        "協調性",
        "計画性",
        "好奇心",
        "交渉力",
        "行動力",
        "客観視点",
        "コミュニケーション能力",
        "柔軟性",
        "状況対応能力",
        "情報収集能力",
        "迅速性",
        "正確性",
        "責任感",
        "説得力",
        "想像力",
        "探究心",
        "チームワーク",
        "調整力",
        "人間関係構築力",
        "粘り強さ",
        "判断力",
        "ビジネスマナー",
        "分析力",
        "マーケティング知識",
        "向学心",
        "目的意識",
        "要点整理力",
        "リーダーシップ",
        "理解力",
        "論理的思考能力",
        "資料作成能力",
    ];

    const showAdditionalInfo = [
        "自分が販売する商品の機能だけでなく、その商品が生活やビジネスにどのような価値を与えるかを理解しておくことが重要であること",
        "営業は、お客様に商品の購入をお願いするのではなく、お客様の立場に立って、お客様にとってのメリットを伝え、お客様が購買行動を起こす際の阻害要因を明らかにして、それらを除去する方法について考えることが大切であること",
        "自分が持っている知識やノウハウの新たな使い方について、常に考え続けることが大切であること",
        "発生している問題にはその問題の根本的な原因があり、それを解決しない限り問題の解決はできないこと",
        "常に目的を意識し、目的の達成に必要な情報や素材について意識しておく必要があること",
        "生命や財産に影響を与えるリスクをあらかじめ想定し、それらの回避方法を準備して実行することで、危機的な状況に陥らないようになること",
        "相手の立場を理解し、業務や交渉をスムーズに運ぶための配慮ができること",
        "誰もが納得できる表現をするためには、自分の主観を捨てることや、人に評価してもらう必要があること",
        "相手と協力し合いながら作業を進めることで、自分一人でできる限界を超えることができること",
        "詳細な計画を立てて活動することで、目的達成の確実性が高まること",
        "未知の物事に対しても興味を持ち、主体的に情報を収集したり取り組んだりすることで、常に新たな発見があること",
        "自分の意見だけを主張するのではなく、交渉相手にとってのメリットを提示することで、交渉がスムーズに進むこと",
        "率先して主体的に行動することで、物事の進捗が大幅に早まること",
        "常にお客様視点で物事を考えることで、効果的な提案や営業活動ができるようになること",
        "相手の立場に立って意見を聞くことで、相手の意図を理解しやすくなること。相手の理解度に応じて話し方を変えることで、相手に的確に情報を伝えることができること",
        "自分と異なる意見に対して否定的にならず聞き入れることで、相手の意見の良い部分を発見できること",
        "発生が予測される状況への対応策をあらかじめ準備しておき、予測しない状況に遭遇した際にも準備した対策を応用して対処できるようになること",
        "情報に応じて効率的な情報収集方法が異なること",
        "やるべきことにすぐ取り組むことで、素早く結果を出すことができること",
        "作業に集中することと何度も見直すことで、作業を間違うことなく遂行できるようになること",
        "常に責任を意識し、与えられた役割をやり遂げる意識を持つことで、簡単に諦めなくなること",
        "相手にわかりやすく説明し、実際の行動で示すことで相手を説得しやすくなること",
        "常に目的を意識し、常識にとらわれずに自由に発想する習慣を身に着けることで、新たなアイデアが浮かんでくること",
        "未知の物事に対して好奇心を抱き続けることで、その背景にある原理や現象を知りたくなること",
        "チームメンバーの性格や得意なことを理解したうえで、適切な役割分担をして協力しながら活動することで、困難な課題でも解決できること",
        "関係者のニーズを正確に把握し全員のニーズに配慮することで、異なる意見を調整できる可能性が高まること",
        "業務や交渉をスムーズに運ぶために、信頼関係を構築することができること",
        "困難な業務・交渉や大量の処理を行う必要がある際に、諦めずに取り組むことができること",
        "素早い判断を行うことで物事の進捗を早めることはできるが、加えて正しい判断を行うためには、判断した結果が及ぼす影響について事前に考慮しておく必要があること",
        "仕事を行う上で、相手を不愉快にさせないための基本的なマナーを身に着ける必要があること",
        "正確な分析を行うためには、分析対象に応じた効果的な分析方法を知っておく必要があること",
        "多くのお客様が求める商品やサービスの作り方のほか、お客様に商品を購入してもらう方法についても理解しておくと効率的に商品を販売できること",
        "常に新しい知識を収集したり、実践によってノウハウを収集したりすることで、効率的に物事を進めることができるようになること",
        "物事に取り組む際には、目的を常に意識することで無駄な活動を削減することができること",
        "物事を分かりやすい言葉で端的に表現することで、相手に伝わりやすくなること",
        "チーム活動では、信頼されるリーダーが率先して活動の方向性を示す必要があること",
        "得た情報や相手の言葉を別の言葉で正確に表現できないと、理解したとは言えないこと",
        "物事の関係性や問題の原因の構造を理解し道筋を立てて説明することで、相手に情報や考え方を伝えやすくなること",
        "図と文章をうまく使うことで、情報が相手に伝わりやすくなること",
    ];
    
    const questions = [
        "自分の強みとなる「1つ目の知識や能力」を選択してください。",
        "自分の強みとなる「2つ目の知識や能力」をプルダウンから選択してください。",
        `その強みを発揮した大学時代の「活動名」を
    「〇〇の活動」という形式で具体的に記入してください。`,
        `その活動の中での「活動の目的や目標」を
    記入してください。`,
        `その活動でのあなたが「担った役割」を
    記入してください。`,
        "その活動での課題を記入してください。",
        `課題に対してどのように取り組んだか
    記入してください。`,
        `その活動を通じて、どのような結果や成果を
    上げたか記入してください。`,
        "「志望企業の正式名称」を記入してください。",
        "「志望している企業のＴＯＰページのアドレスを入力してください。",
        `志望企業の「ミッションや理念」をホームページから
    探してきて記入してください。`,
    ];
    
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get("https://reuvindevs.com/liff/public/api/questions");
          setQuestionList(response.data.questions);
          setWritingAdvice(response.data.writing_advice);
          console.log(questionList)
          console.log(writingAdvice)
        } catch (error) {
          console.error("Error fetching questions:", error);
          alert("Error fetching questions. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchQuestions();
    }, []);


    useEffect(() => {
      const loadLIFF = async () => {
        try {
          console.log("Attempting to load LIFF SDK...");
          await import('https://static.line-scdn.net/liff/edge/2.1/sdk.js')
            .then(() => {
              console.log("LIFF SDK loaded successfully");
              const liff = window.liff;
  
              if (liff) {
                liff.init({
                  liffId: "2006819941-ENbBdgWN",
                })
                .then(() => {
                  if (liff.isLoggedIn()) {
                    liff.getProfile()
                      .then((profile) => {
                        console.log("User Profile:", profile);
  
                        setUserId(profile.userId);
                        setFormData(prevData => ({
                          ...prevData,
                          userId: profile.userId,
                          displayName: profile.displayName
                        }));
                      })
                      .catch((err) => {
                        console.error("Error fetching user profile:", err);
                        alert("Error fetching user profile. Please try again.");
                      });
                  } else {
                    alert("User is not logged in. User ID not detected.");
                    // liff.login();
                  }
                })
                .catch((err) => {
                  console.error("Error initializing LIFF:", err);
                  alert("Error initializing LIFF SDK. Please try again later.");
                });
              } else {
                console.error("LIFF SDK not found on window object.");
                alert("LIFF SDK not loaded properly.");
              }
            })
            .catch((error) => {
              console.error("Error loading LIFF SDK:", error);
              alert("Failed to load LIFF SDK. Please try again later.");
            });
        } catch (error) {
          console.error("Unexpected error:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      };
  
      loadLIFF();
    }, []);
  
    useEffect(() => {
      if (userId) {
        setFormData(prevData => ({
          ...prevData,
          userId: userId,
        }));
      }
    }, [userId]);
  
    const handleSubmit = async () => {
      console.log(formData);
      setIsLoading(true);
      
      try {
          const postResponse = await axios.post(
              "https://reuvindevs.com/liff/public/api/answers",
              formData,
              {
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
          );
  
          if (postResponse.status === 200) {
              console.log(postResponse.data.openai)
              setOptionComponent(true);
              setPrompt(postResponse.data.openai)
          } else {
              console.error("Submission failed: ", postResponse.data);
          }
      } catch (error) {
          console.error("Error during submission or fetching prompt:", error);
          alert("An error occurred while processing your request.");
      } finally {
          setIsLoading(false);
      }
  };
    
    if(optionComponent){
      return <Option 
        prompt={prompt}
        userId={userId}
      />
    }
    if (isLoading) {
      return <Loading />;
    }

    const popUpAdvice = () => {
        setShowAdvice(!showAdvice)
    }
    const handleOptionClick = (value) => {
        setSelectedOption(value);
        setDropdownOpen(false);
        setShowAdditionalDiv(true);
        setFormData((prevData) => ({
            ...prevData,
            [`Question_${progress}`]: value,
        }));
      };
  
      const handleInputLimit = (event) => {
        const inputValue = event.target.value.slice(0, maxInput);
        setCurrentInput(inputValue);
      
        const questionKey = `Question_${currentStep}`;
      
        setFormData((prevData) => {
          const updatedData = {
            ...prevData,
            [questionKey]: inputValue,
          };
      
          console.log('Updated formData:', updatedData);
          return updatedData;
        });
      };
  
      const nextQuestion = () => {
        setCurrentInput('');
        const currentQuestionKey = `Question_${progress}`;
        if (!formData[currentQuestionKey]) {
            alert(`Question ${progress} is required.`);
            return;
        }

        if(progress === 11){
            handleSubmit()
            return;
        }
        
    
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            setShowAdditionalDiv(false);
            setProgress(progress + 1);
        }
    };    
      
    const prevQuestion = () => {
      if(progress === 1 || progress === 2){
        setShowAdditionalDiv(true);
      }
      if (currentStep > 1) {
        setProgress(progress - 1);
        setCurrentStep(currentStep - 1);
        setShowAdditionalDiv(false);
        setCurrentInput(formData[`Question_${currentStep - 1}`] || '');
      }
    };

    console.log('FORMDATA: ', formData)
    return (
      <div className="min-h-screen bg-blue-100 flex justify-center items-center relative">
        {questionList.length === 0 ? (
          <h1><HomeLoading /></h1>
        ):(
          <div className="bg-white w-80 rounded-lg shadow-lg h-[550px] overflow-hidden relative">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <img
              src={ArrowB}
              alt="Arrow Top"
              className={progress === 1 ? `hidden` : `w-5 cursor-pointer rotate-180 `}
              onClick={prevQuestion}
            />
          </div>
  
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex space-x-1 mt-8 -mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${
                    i < progress ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-gray-600 text-sm font-medium">{`${currentStep} / ${totalSteps}`}</span>
          </div>
  
          <div className="p-4 text-center">
            <p className="text-sm font-medium text-gray-700 mb-1 bg-slate-300 px-10 py-2">
              {questionList[currentStep - 1]}
            </p>
  
            {(progress === 1 || progress === 2) ? (
            <div className="relative">
                <select
                    className="w-full border border-black px-4 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData[`Question_${progress}`] || ""}
                    onChange={(e) => handleOptionClick(e.target.value)} 
                >
                    <option value=""></option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        ) : null}
          </div>
  
          {showAdditionalDiv && selectedOption && (
            <div>
              <div className="bg-gray-300 w-72 ml-4 border-black border-2 py-1 px-4 mb-2">
                <p className="text-sm">能力の説明</p>
              </div>
              <div className="p-4 bg-gray-100 border-black border-2 w-72 ml-4 overflow-y-auto min-h-64 max-h-72">
                  <p className="text-sm text-gray-600 text-justify">
                  {showAdditionalInfo[options.indexOf(selectedOption)]}
                  </p>
              </div>
            </div>
            )}
        
          {progress >= 3 && progress <= 8 && (
            <div className="relative bg-white p-4 max-w-sm mx-auto -mt-5">
              <label className="block text-gray-600 text-sm mb-1">
                書き方のアドバイス
              </label>
              <textarea
                type="text"
                maxLength={maxInput}
                rows={5}
                value={writingAdvice[progress - 1]}
                onChange={handleInputLimit}
                className="w-full text-sm px-2 py-1 border-black border-2 cursor-pointer"
                readOnly
                onClick={popUpAdvice}
                />
              <p className="text-xs text-right text-gray-500 mt-1">
              入力文字数: {currentInput.length} / {maxInput}
            </p>
            <textarea
                type="text"
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={handleInputLimit}
                className="w-full px-2 py-1 border-black border-2"
                placeholder="..."
                rows={6}
                name={`Question_${questions[currentStep]}`}
                />
            </div>
          )}
            {progress === 11 && (
                <div className="relative bg-white p-4 max-w-sm mx-auto -mt-5">
                <label className="block text-gray-600 text-sm mb-1">
                書き方のアドバイス
                </label>
                <textarea
                type="text"
                maxLength={maxInput}
                rows={5}
                value={writingAdvice[progress - 1]}
                onChange={handleInputLimit}
                className="w-full px-2 py-1 border-black border-2 cursor-pointer"
                readOnly
                onClick={popUpAdvice}
                />
                <p className="text-xs text-right text-gray-500 mt-1">
                入力文字数: {currentInput.length} / {maxInput}
            </p>
            <textarea
                type="text"
                rows={6}
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={handleInputLimit}
                className="w-full px-2 py-1 border-black border-2"
                placeholder="..."
                name={`Question_${questions[currentStep]}`}
                />
            </div>
          )}
           {showAdvice && (
            <div className="grid z-50">
                <div className="fixed inset-0 flex justify-center items-center">
                <div className="relative p-4 bg-white border-black border w-[300px] h-[380px] overflow-y-auto">

                    <p className="text-sm text-gray-600 text-justify">{writingAdvice[progress - 1]}</p>
                    <button
                    onClick={popUpAdvice}
                    className="bg-slate-400 text-gray-600 px-4 py-2 shadow absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full mt-11"
                    >
                    アドバイスを閉じる
                    </button>
                </div>
                </div>
            </div>
            )}
            {progress === 9 && (
                <div className="relative bg-white p-4 max-w-sm mx-auto ">
                <div className="-mt-6">
                <input
                type="text"
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={handleInputLimit}
                className="w-full px-2 py-1 border-black border-2"
                placeholder="..."
                name={`Question_${questions[currentStep]}`}
                />
                </div>
            </div>
            )}
            {progress === 10 && (
                <div className="relative bg-white p-4 max-w-sm mx-auto">
                <div className="-mt-6">
                <input
                type="text"
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={handleInputLimit}
                className="w-full px-2 py-1 border-black border-2"
                placeholder="..."
                name={`Question_${questions[currentStep]}`}
                />
                </div>
            </div>
            )}
            
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <img
              src={ArrowB}
              alt="Arrow Bottom"
              className="w-5 cursor-pointer"
              onClick={nextQuestion}
            />
          </div>
        </div>
        )}
      </div>
    );
  };

export default Home;
