import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import CarouselQuestion from "./CarouselQuestion";
import CarouselOperation from "./CarouselOperation";
import ImageA from "./questions/quesa.jpg";
import ImageB from "./questions/quesb.jpg";
import ImageC from "./questions/quesc.jpg";
import ImageD from "./questions/quescc.jpg";
import ImageE from "./questions/quesd.jpg";
import ImageF from "./questions/quesdd.jpg";
import ImageG from "./questions/quese.jpg";
import ImageH from "./questions/quesee.jpg";
import ImageI from "./questions/quesf.jpg";
import ImageJ from "./questions/quesff.jpg";
import ImageK from "./questions/quesg.jpg";
import ImageL from "./questions/quesgg.jpg";
import ImageM from "./questions/quesh.jpg";
import ImageN from "./questions/queshh.jpg";
import ImageO from "./questions/quesi.jpg";
import ImageP from "./questions/quesj.jpg";
import ImageQ from "./questions/quesk.jpg";
import ImageR from "./questions/queskk.jpg";
import ImageS from "./questions/quesl.jpg";
import ImageT from "./questions/quesm.jpg";
import ImageU from "./questions/quesn.jpg";

import OperationalA from "./operational/1.png";
import OperationalB from "./operational/2.png";
import OperationalC from "./operational/3.png";
import OperationalD from "./operational/4.png";
import OperationalE from "./operational/5.png";
import OperationalF from "./operational/6.png";
import OperationalG from "./operational/7.png";
import OperationalH from "./operational/8.png";
import OperationalI from "./operational/9.png";
import OperationalJ from "./operational/10.png";
import OperationalK from "./operational/11.png";
import OperationalL from "./operational/12.png";
import OperationalM from "./operational/13.png";
import OperationalN from "./operational/14.png";
import OperationalO from "./operational/15.png";
import OperationalP from "./operational/16.png";

const slides = [
  { text: "質問1", image: ImageA, alt: "Slide 1" },
  { text: "質問2", image: ImageB, alt: "Slide 2" },
  { text: "質問3", image: ImageC, alt: "Slide 3" },
  { text: "質問3 Pop-up", image: ImageD, alt: "Slide 4" },
  { text: "質問4", image: ImageE, alt: "Slide 5" },
  { text: "質問4 Pop-up", image: ImageF, alt: "Slide 6" },
  { text: "質問5", image: ImageG, alt: "Slide 7" },
  { text: "質問5 Pop-up", image: ImageH, alt: "Slide 8" },
  { text: "質問6", image: ImageI, alt: "Slide 9" },
  { text: "質問6 Pop-up", image: ImageJ, alt: "Slide 10" },
  { text: "質問7", image: ImageK, alt: "Slide 11" },
  { text: "質問7 Pop-up", image: ImageL, alt: "Slide 12" },
  { text: "質問8", image: ImageM, alt: "Slide 13" },
  { text: "質問8 Pop-up", image: ImageN, alt: "Slide 14" },
  { text: "質問9", image: ImageO, alt: "Slide 15" },
  { text: "質問10", image: ImageP, alt: "Slide 16" },
  { text: "質問11", image: ImageQ, alt: "Slide 17" },
  { text: "質問11 Pop-up", image: ImageR, alt: "Slide 18" },
  { text: "質問12", image: ImageS, alt: "Slide 19" },
  { text: "質問13", image: ImageT, alt: "Slide 20" },
  { text: "質問14", image: ImageU, alt: "Slide 21" },
];

const slide = [
  { text: "ステップ 1 メニュー", image: OperationalA, alt: "Slide 1" },
  {
    text: "ステップ2ガクチカ/志望動機/自己PR 生成",
    image: OperationalB,
    alt: "Slide 2",
  },
  {
    text: "ステップ2ガクチカ/志望動機/自己PR 生成",
    image: OperationalC,
    alt: "Slide 3",
  },
  {
    text: "ステップ2ガクチカ/志望動機/自己PR 生成",
    image: OperationalD,
    alt: "Slide 4",
  },
  {
    text: "ステップ2ガクチカ/志望動機/自己PR 生成",
    image: OperationalE,
    alt: "Slide 5",
  },
  {
    text: "ステップ2ガクチカ/志望動機/自己PR 生成",
    image: OperationalF,
    alt: "Slide 6",
  },
  {
    text: "ステップ2ガクチカ/志望動機/自己PR 生成",
    image: OperationalG,
    alt: "Slide 7",
  },
  {
    text: "ステップ2ガクチカ/志望動機/自己PR 生成",
    image: OperationalH,
    alt: "Slide 8",
  },
  {
    text: "自己PR文の生成と貼り付け板への複製",
    image: OperationalI,
    alt: "Slide 9",
  },
  {
    text: "文章に変換",
    image: OperationalJ,
    alt: "Slide 10",
  },
  {
    text: "文章文件の下載",
    image: OperationalK,
    alt: "Slide 11",
  },
  {
    text: "ブラウザで開く",
    image: OperationalL,
    alt: "Slide 12",
  },
  {
    text: "文章生成エラー",
    image: OperationalM,
    alt: "Slide 13",
  },
  { text: "ステップ3友達に紹介", image: OperationalN, alt: "Slide 14" },
  { text: "ステップ3友達に紹介", image: OperationalO, alt: "Slide 15" },
  { text: "ステップ4使い方", image: OperationalP, alt: "Slide 16" },
];

function Carousel() {
  return (
    <div className="App">
      <h2>使い方</h2>
      <div className="questions">
        <h4>1. 質問リスト</h4>
        <CarouselQuestion slides={slides} />
      </div>

      <div className="operational">
        <h4>2. 運用</h4>
        <CarouselOperation slide={slide} />
      </div>
    </div>
  );
}

export default Carousel;
