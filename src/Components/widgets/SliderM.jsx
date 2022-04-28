
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, {
  Pagination, Navigation
} from 'swiper';
SwiperCore.use([Pagination, Navigation]);

export default function SliderM() {
  return (

    <div className="row">
      <div className="col-xs-12">
        <>
          <Swiper pagination={{
            "type": "fraction"
          }} navigation={true} className="mySwiper">
            <SwiperSlide> <img src="assets/img/tracks-thumbnail/AmirTataloo_Angel_dorost.jpg" alt="" srcset="" /> Slide 1</SwiperSlide><SwiperSlide>Slide 2</SwiperSlide><SwiperSlide>Slide 3</SwiperSlide><SwiperSlide>Slide 4</SwiperSlide><SwiperSlide>Slide 5</SwiperSlide><SwiperSlide>Slide 6</SwiperSlide><SwiperSlide>Slide 7</SwiperSlide><SwiperSlide>Slide 8</SwiperSlide><SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </>
      </div>
    </div>
  );
};