import _ from "lodash";
import React from "react"
import StorySlide from "./StorySlide"

export default function Story({ story = "", storyMedias = [] }) {
  return <div className="story">
    <div className="story_container">
      {_.size(storyMedias) > 0 && <div className="story_slide">
        <StorySlide storyMedias={storyMedias} />
      </div>}
      {story && <div className="story_content">
        {/* <div className="story_text_title">
        Câu chuyện ra đời
      </div> */}
        <div className="story_text" dangerouslySetInnerHTML={{ __html: story }}>
        </div>
      </div>}
    </div>
  </div>
}