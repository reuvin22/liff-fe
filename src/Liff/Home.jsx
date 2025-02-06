import React, { useState, useEffect } from "react";
import ArrowB from "../assets/arrow.png";
import axios from "axios";
import liff from "@line/liff";
import Loading from "./Loading";
import LoadingError from "./LoadingError";
import Generate from "./Generate";
import Option from "./Option";
import HomeLoading from "./HomeLoading";
import { useAdsContext } from "../utils/context";
const Home = () => {
    const context = useAdsContext()
    const [progress, setProgress] = useState(1);
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps] = useState(14);
    const [isGenerate, setIsGenerate] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [currentInput, setCurrentInput] = useState("");
    const [showAdvice, setShowAdvice] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [optionComponent, setOptionComponent] = useState(false)
    const [prompt, setPrompt] = useState("")
    const [questionList, setQuestionList] = useState([])
    const [writingAdvice, setWritingAdvice] = useState([])
    const maxInput =
    progress === 3 || progress === 4 || progress === 5
      ? 100
      : progress === 6 || progress === 8
      ? 200
      : progress === 7
      ? 600
      : 200;
    const [formData, setFormData] = useState({
        userId: null,
        displayName: '',
        Question_1: '',
        Ability_Desc_1: '',
        Question_2: '',
        Ability_Desc_2: '',
        Question_3: '',
        Question_4: '',
        Question_5: '',
        Question_6: '',
        Question_7: '',
        Question_8: '',
        Question_9: '',
        Question_10: '',
        Question_11: '',
        Question_12: '',
        Question_13: '',
        Question_14: ''
    });
    const [userId, setUserId] = useState(null);

    const options = [
        "FP知識",
        "IT知識",
        "パソコン操作能力",
        "営業力",
        "営業知識",
        "応用力",
        "外国語力",
        "課題認識能力",
        "企画力",
        "危機管理能力",
        "気配り",
        "客観性",
        "協調性",
        "金融知識",
        "計画性",
        "経理知識",
        "好奇心",
        "交渉力",
        "行動力",
        "顧客視点",
        "コミュニケーション能力",
        "柔軟性",
        "状況対応能力",
        "商品知識",
        "情報収集能力",
        "迅速性",
        "ストレス耐性",
        "正確性",
        "生産および製造技術・知識",
        "責任感",
        "接客能力",
        "設計技術・知識",
        "説得力",
        "創造力",
        "探究心",
        "チームワーク",
        "調整力",
        "人間関係構築力",
        "粘り強さ",
        "判断力",
        "ビジネスマナー",
        "品質管理技術・知識",
        "不動産・建築知識",
        "プレゼンテーション能力",
        "プロジェクト管理能力",
        "文章力",
        "分析力",
        "マーケティング知識",
        "向学心",
        "マネジメント能力",
        "目的意識",
        "要点整理能力",
        "リーダーシップ",
        "理解力",
        "論理的思考能力",
        "資料作成能力",
        "法律知識",
        "コンサルティング知識",
        "経営知識",
        "人事知識",
        "生産管理知識",
    ];

    const showAdditionalInfo = [
      "ファイナンシャルプランナー（FP）の資格や、資産運用についてアドバイスできる知識を持っている",
      "業務で活用できる必要最低限の情報システムに関する知識を習得している",
      "ExcelやWordなど、パソコン業務を行う上で必要な基本ソフトを使いこなせる",
      "商品の販売に必要な知識や能力を発揮できる",
      "法人向け営業を行うための必要最低限の知識を習得している",
      "入手した知識やノウハウを互いに関連付けて利用したり、基本的な知識を複雑な問題の解決に活用したりできる",
      "外国人との業務を遂行する上で、コミュニケーションに問題がない語学力がある",
      "発生した問題の原因を理解し、取り組むべき課題を導き出すことができる",
      "情報や素材を整理し、目的に合わせて新たな活動計画を立案することができる",
      "生命や財産に影響を与えるリスクをあらかじめ想定し、それらの回避方法を準備して実行できる",
      "相手の立場を理解し、業務や交渉をスムーズに運ぶための配慮ができる",
      "誰もが納得できる視点を持ち、それを表現できる",
      "相手と協力し合いながら作業を進めることができる",
      "金融商品の販売、資金計画、ローン計画などの金融業務を行う上で必要な知識を持ち、それらを活用できる",
      "目標達成までの活動において、いつまでに何をしなければならないかを考え、それに沿った行動ができる",
      "入出金処理や伝票／納品書／請求書発行など、経理に関する業務を遂行する上で必要な知識を習得している",
      "未知の物事に対して幅広く興味を持ち、自主的に情報収集したり取り組んだりできる",
      "意見や立場が異なる相手と話し合い、より自分の意図に近い合意形成ができる",
      "必要な行動を自発的に実行できる",
      "顧客の立場に立って物事を捉え、顧客の思考やニーズを理解することができる",
      "相手の意図を理解し、相手の理解度に応じて話す内容や話し方を変えることにより、的確に情報を伝えることができる",
      "自分と異なる意見に対して否定的にならず、まずは聞き入れ、その中で良い部分を取り入れることができる",
      "発生が予想される状況への対応策をあらかじめ準備し、予期しない状況に遭遇した際には準備していた対策を活用して対処できる",
      "志望する企業の商品の特性を正確に理解し、顧客や取引先に対して適切な情報を提供することができる",
      "必要な情報を、さまざまな手段を用いて効率的に入手できる",
      "やるべきことにすぐに取り組み、素早く結果を出す",
      "不利な状況においても平常心を保つことができる",
      "果たすべき作業を、想定された意図の通り間違うことなく遂行できる",
      "生産・製造活動を行う上で必要な技術や知識を習得している",
      "自身の責任を常に意識し、与えられた役割を全うすることができる",
      "接客や外部とのコミュニケーションを通じて、相手に好印象を与えることができる",
      "設計業務を行う上で必要な技術や知識を習得している",
      "相手を納得させるような話し方、論理展開、行動ができる",
      "過去に存在しない物や考え方を、固定概念にとらわれず発想できる",
      "未知の物事に対して好奇心を抱き、その背景にある原理や現象を知ろうと努力する",
      "チームメンバーと協力し合いながら、目標を達成するために行動できる",
      "利害の異なる関係者全員が納得できるような、バランスの取れた結論を導き出すことができる",
      "業務や交渉をスムーズに進めるために、ステークホルダーとの信頼関係を構築することができる",
      "困難な業務や交渉を進めたり、大量の作業を処理する必要がある際に、諦めずに取り組むことができる",
      "物事やそれを取り巻く状況を正しく認識し、迅速な意思決定ができる",
      "仕事を行う上で、相手を不愉快にさせないための基本的なマナーを身に付けている",
      "品質管理を行う上で必要な技術や知識を習得している",
      "不動産・建築の業務を行う上で必要な知識を習得している",
      "伝えたいことを相手に理解されるように伝えて、相手の行動を促すことができる",
      "プロジェクトを成功させるための各活動の計画立案、日程表の作成、進捗管理などができる",
      "文章で、読み手に伝えたいことを的確に表現できる",
      "目的に応じて情報や事象のメカニズムを解き明かすことができる",
      "多くの顧客が求める商品・サービスの作り方のほか、顧客が商品を購入したくなる方法について理解している",
      "新しい知識やノウハウを、常に実践的に収集している",
      "必要な人・物・金・情報などの資源を効率的に調達し、目的を達成できる",
      "与えられた役割を果たすためにあらゆる手段を検討し、それらを実行に移すことができる",
      "収集した情報を体系的に整理し、短い言葉でその要点をまとめることができる",
      "チームの目標や役割の達成に向け、主体的にチームをゴールへ導くことができる"
  ];  
    
    const questions = [
        "自分の強みとなる「1つ目の知識や能力」をプルダウンから選択してください。",
        "自分の強みとなる「2つ目の知識や能力」をプルダウンから選択してください。",
        `その強みを発揮した大学時代の「活動名」を「〇〇の活動」という形式で端的に記入してください。`,
        `その活動の中での「活動の目的や目標」を記入してください。
  記入する際は「○○することを目的（目標）にしました」と続くように記入してください`,
          `その活動でのあなたが「担った役割」を記入してください。
  記入する際は「○○することことが自身の役割でした」と続くように記入してください`,
          `その活動での課題を記入してください。
  課題とは、乗り越えることが困難だと感じたことを端的に記入してください。
  記入する際は「○○こと」と続くように記入してください。`,
          `前項目で記入した課題に対してどのように取り組んだか記入してください。
  記入する際は「○○ことを意識した」と続くように記入してください。`,
          `その活動を通じて、どのような結果や成果を上げたか記入してください`,
        `「志望企業の正式名称」を記入してください。
  （株式会社等の法人形態は省いてください）`,
        "志望している企業のＴＯＰページのアドレスを入力してください。",
        `志望企業の「ミッションや理念」をホームページから探してきて記入してください。`,
        `あなたが魅力を感じる「企業理念・ビジョン・ミッション」「事業内容」「具体的な仕事内容」を記載してください。`,
        `なぜその会社に魅力を感じるのか、自分自身の経験やその中で感じたこと、考えたことも含めて説明してください。`,
        `2の理由と1の内容に整合性がない場合は、感情や考えを想定して理由だけを作成してください`
    ];
    
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get("https://reuvindevs.com/liff/public/api/questions");
          setQuestionList(response.data.questions);
          setWritingAdvice(response.data.writing_advice);
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
                    liff.login();
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
      console.log("🔹 Form Data:", formData);
      setIsLoading(true);
      context.setIsDone(false);
      console.log("🔹 Context value before API call (Home):", context.isDone);
  
      const timeout = setTimeout(() => {
          context.setIsDone(true);
          console.log("🔹 Timeout reached: `isDone` set to true (Home)");
      }, 6000);
  
      try {
          const postResponse = await axios.post(
              "https://reuvindevs.com/liff/public/api/answers",
              formData,
              {
                  headers: { "Content-Type": "application/json" },
              }
          );
  
          clearTimeout(timeout);
  
          if (
              postResponse.data.openai === "申し訳ありませんが、そのリクエストには対応できません。" ||
              postResponse.data.openai === "申し訳ございませんが、このリクエストを処理することはできません。"
          ) {
              setHasError(true);
          }
  
          if (postResponse.status === 200) {
              console.log("✅ API Response:", postResponse.data.openai);
              setOptionComponent(true);
              setPrompt(postResponse.data.openai);
              context.setIsDone(true);
              console.log("🔹 Context value after API call (Home):", context.isDone);
          } else {
              console.error("❌ Submission failed: ", postResponse.data);
          }
      } catch (error) {
          console.error("❌ Error during submission:", error);
          alert("An error occurred while processing your request.");
      } finally {
          setIsLoading(false);
      }
  };  
    
    if (optionComponent) {
        return <Option prompt={prompt} userId={userId} />;
    }
    
    if (isLoading) {
        return <Loading generate={prompt}/>;
    }  

    const popUpAdvice = () => {
        setShowAdvice(!showAdvice)
    }

    const handleOptionClick = (value) => {
      const abilityDescriptionIndex = options.indexOf(value);
  
      console.log("Selected Ability Index:", abilityDescriptionIndex);
  
      setSelectedOption(value);
      setDropdownOpen(false);
      setShowAdditionalDiv(true);
      
      setFormData((prevData) => ({
          ...prevData,
          [`Question_${progress}`]: value,
          [`Ability_Desc_${progress}`]: showAdditionalInfo?.[abilityDescriptionIndex] || "",
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
            alert(`質問に答えてください.`);
            return;
        }

        if(progress === 14){
            handleSubmit()
            return;
        }
        
    
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            setShowAdditionalDiv(false);
            setProgress(progress + 1);
        }

        setShowAdvice(false)
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
      setShowAdvice(false)
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
            <div className="flex mt-8 -mb-4">
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
  
          <div className="p-4">
            <div className="text-sm font-medium text-gray-700 mb-1 bg-slate-300 px-2 py-2">
              <ul className="list-disc pl-5">
                <li className="text-left">{questionList[currentStep - 1]}</li>
              </ul>
            </div>
  
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
          <div className="relative bg-white p-4 max-w-sm mx-auto">
            <label className="block text-gray-600 text-sm mb-1 -mt-7">
              書き方の助言
            </label>
            <textarea
              type="text"
              maxLength={progress === 3 || progress === 4 || progress === 5 ? 100 : progress === 6 || progress === 8 ? 200 : progress === 7 ? 600 : 200 }
              rows={5}
              value={writingAdvice[progress - 1]}
              onChange={handleInputLimit}
              className={`cursor-pointer text-sm min-h-36 max-h-36 w-full px-2 py-1 border-black border-2 ${showAdvice && progress >= 4 && progress <= 8 ? "mt-2" : ""} ${showAdvice && currentStep === 6 ? "mt-6" : ""}`}
              readOnly
              onClick={popUpAdvice}
            />
            <p
              className={`text-xs text-right text-gray-500 ${showAdvice && progress >= 4 && progress <= 8 ? "mt-3" : "mt-1"} ${showAdvice && currentStep === 6 ? "mt-9" : ""}`}
            >
              入力文字数: {currentInput.length} / {progress === 3 || progress === 4 || progress === 5 ? 100 : progress === 6 || progress === 8 ? 200 : progress === 7 ? 600 : 200 }
            </p>
            <textarea
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={(e) => handleInputLimit(e)}
                className="w-full sm:text-xsm sm:text-sm md:text-md px-2 py-1 border-black border-2"
                placeholder="..."
                rows={showAdvice && currentStep === 6 ? 4 : 6}
                name={`Question_${questions[currentStep]}`}
              />
          </div>
        )}
            {progress === 11 && (
                <div className="relative bg-white p-4 max-w-sm mx-auto -mt-5">
                <label className="block text-gray-600 text-sm mb-1">
                書き方の助言
                </label>
                <textarea
                type="text"
                maxLength={200}
                rows={5}
                value={writingAdvice[progress - 1]}
                onChange={handleInputLimit}
                className="w-full px-2 py-1 border-black border-2 cursor-pointer"
                readOnly
                onClick={popUpAdvice}
                />
                <p className={showAdvice && progress === 11 ? `text-xs text-right text-gray-500 mt-7` :
                  `text-xs text-right text-gray-500 mt-1`
                }>
                入力文字数: {currentInput.length} / {200}
            </p>
            <textarea
                maxLength={maxInput}
                value={formData[`Question_${currentStep}`] || ""}
                onChange={(e) => handleInputLimit(e)}
                className="w-full sm:text-xsm sm:text-sm md:text-md px-2 py-1 border-black border-2"
                placeholder="..."
                rows={6}
                name={`Question_${questions[currentStep]}`}
              />
          </div>
          )}
          {showAdvice && (
              <div
                  className={`p-4 bg-white border-black border max-w-72 min-w-72 max-h-80 min-h-56 overflow-y-auto absolute top-5 ml-4 ${
                      writingAdvice[progress - 1]?.length < 200 ? "mt-10" : "mt-1"
                  }`}
              >
                  <div className="grid place-items-center">
                      <p className="text-sm text-gray-600 text-justify">
                          {writingAdvice[progress - 1]}
                      </p>
                      <button
                          onClick={popUpAdvice}
                          className="bg-slate-400 text-gray-600 px-4 py-2 w-full mt-4"
                      >
                          助言を閉じる
                      </button>
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
           {(progress === 12 || progress === 13 || progress === 14) && (
              <div className="relative bg-white p-4 max-w-sm mx-auto">
                  <div className="-mt-6">
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
