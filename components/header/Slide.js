import _ from "lodash"
import styled from "styled-components"
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import { useRouter } from "next/router"
import utils from "../../utils"
import api from "../../api"
import { v4 as uuidv4 } from 'uuid';

const Img = styled.img`
  width:100%;
  max-height: 500px;
`;

function getSlide(images) {
  return _.map(images, i => ({ id: uuidv4(), src: i }))
}

const items = [
  {
    id: 1,
    src: "https://storage.googleapis.com/banhcomdemo/slide.jpg",
  },
  {
    id: 2,
    src: "https://storage.googleapis.com/banhcomdemo/slide.jpg",
  },
  {
    id: 3,
    src: "https://storage.googleapis.com/banhcomdemo/slide.jpg",
  }
];

const Slide = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slideImage, setSlideImage] = useState([]);
  const router = useRouter()
  const categoryId = utils.getCategoryId(_.get(router, "query.id"));


  console.log("slideImage", slideImage, items)

  useEffect(() => {
    api.getCategory(categoryId).then(res => res.images).then(getSlide).then(setSlideImage)
  }, [categoryId])

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slideImage.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slideImage.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slideData = _.size(slideImage) == 0 ? items : slideImage

  const slides = _.map(slideData, (item) => {
    return (
      <CarouselItem key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <Img src={item.src} />
      </CarouselItem>
    );
  });

  return (
    <div className="slide_intro_container">
      <Carousel
        height={500}
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={slideImage} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}

export default Slide;