import React from "react";
import { useCarousel } from "../../hooks/useCarousel";
import classnames from "classnames";
import Transition from "../Transition";
import { GatsbyImage } from "gatsby-plugin-image";

import {
  SliderWrap,
  slide,
  slideImage,
  carouselIndicators,
  carouselIndicatorWrap,
  CarouselIndicator,
  carouselContent,
  CarouselChild,
} from "./Components";

const SliderBackground = ({ media, playing, keyProp, globalStyle }) => {
  const slides = media.map((el, index) => {
    return (
      <div key={index} css={slide}>
        {el.localFile && (
          <GatsbyImage image={el.localFile.childImageSharp.fullImage} css={slideImage} />
        )}
      </div>
    );
  });

  const length = slides.length;
  const { active, setActive, handlers, style, slideStyle } = useCarousel(
    { length, interval: 6000, infinite: true, sens: 4 },
    playing
  );
  return length ? (
    <Transition
      keyProp={keyProp}
      timeout={500}
      globalStyle={{ ...globalStyle }}
    >
      {length > 1 ? (
        <SliderWrap className="slider-wrap">
          <ol className="carousel-indicators" css={carouselIndicators}>
            {media.map((_, index) => ( // the slider navigation bullets
              <li
                key={index}
                css={carouselIndicatorWrap}
                className={classnames("carousel-indicator", {
                  active: active === index,
                })}
                onClick={() => setActive(index)}
                role="presentation"
              >
                <CarouselIndicator />
              </li>
            ))}
          </ol>
          <div // wrapper div of the carousel
            className="carousel-content"
            css={carouselContent}
            {...handlers}
            style={style}
          >
            <CarouselChild style={slideStyle} className="carousel-slide">{/* create a copy of the last slide */}
              {slides[slides.length - 1]}
            </CarouselChild>
            {slides.map((slide, index) => (
              <CarouselChild
                className={classnames("carousel-slide", {
                  active: active === index,
                })}
                key={index}
                style={slideStyle}
              >
                {slide}
              </CarouselChild>
            ))}
            <CarouselChild style={slideStyle} className="carousel-slide">{/* create a copy of the first slide */}
              {slides[0]}
            </CarouselChild>
          </div>
        </SliderWrap>
      ) : ( // if there is only one slide, then don't load any carousel
        <SliderWrap className="slider-wrap">
          {media[0].localFile && (
            <GatsbyImage
              image={media[0].localFile.childImageSharp.fullImage}
              className="single-background"
              css={slideImage} />
          )}
        </SliderWrap>
      )}
    </Transition>
  ) : (
    ""
  );
};

export default SliderBackground;
