import _ from "lodash"
import styled from "styled-components"
import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import { v4 as uuidv4 } from "uuid"

const Img = styled.img`
  width:100%;
  max-height:400px;
`;

const ProductSlide = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const imageSlides = _.map(images, i => ({ id: uuidv4(), src: i }))


  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === _.size(imageSlides) - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? _.size(imageSlides) - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = _.map(imageSlides, (item) => {
    return (
      <CarouselItem key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        {item.video ?
          <iframe className="video" src="https://www.youtube.com/embed/CWSpNKjNO54" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          : <Img src={item.src} />}
      </CarouselItem >
    );
  });

  return (
    <div className="product_slide">
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={imageSlides} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}

export default ProductSlide;