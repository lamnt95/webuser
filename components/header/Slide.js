import _ from "lodash"
import styled from "styled-components"
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

const Img = styled.img`
  width:100%;
  max-height: 500px;
`;


const Slide = ({ slideData = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === _.size(slideData) - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? _.size(slideData) - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }



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

  if (_.isEmpty(slideData)) return null;

  return (
    <div className="slide_intro_container">
      <Carousel
        height={500}
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={slideData} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}

export default Slide;