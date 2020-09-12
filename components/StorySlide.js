import styled from "styled-components"
import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

const Img = styled.img`
  width:480px;
  height:360px;
`;

const items = [
  {
    id: 1,
    src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoplist.vn%2Fimages%2F800px%2Fbanh-com-bao-minh-441369.jpg&f=1&nofb=1",
  },
  {
    id: 2,
    src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoplist.vn%2Fimages%2F800px%2Fbanh-com-bao-minh-441369.jpg&f=1&nofb=1",
  },
  {
    id: 3,
    src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoplist.vn%2Fimages%2F800px%2Fbanh-com-bao-minh-441369.jpg&f=1&nofb=1",
  },
];

const Slide = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        {item.video ?
          <iframe className="carousel_video" src="https://www.youtube.com/embed/CWSpNKjNO54" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          : <Img src={item.src} />}
      </CarouselItem>
    );
  });

  return (
    <div className="story_slide_container">
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}

export default Slide;