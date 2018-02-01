import $ from 'jquery';
import PubSub from 'pubsub-js';

import {TimelineMax} from 'gsap';

PubSub.subscribe('gotoslide', function(msg, data) {
  //animation to do

  console.log(data);

  let currentSlide = $(`[data-slide=${data.from}]`);
  let newSlider = $(`[data-slide=${data.to}]`);
  let elements = currentSlide.find('[data-stagger]');
  let newElements = newSlider.find('[data-stagger]');

  let tl = new TimelineMax();

  
  tl
    .staggerTo(elements, 0.3, {y: 0, opacity: 1}, {y: -20, opacity: 0}, 0.1)
    .to(currentSlide, 1, {y: '-100%', opacity: 0})
    .fromTo(newSlider, 1, {y: '100%'},{y: '0%', opacity: 1}, 0.3)
    .staggerFromTo(newElements, 0.3, {y: 20, opacity: 0},{y: 0, opacity: 1}, 0.1, '-=0.4');

});
