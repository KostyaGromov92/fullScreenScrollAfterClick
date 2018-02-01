import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class Paginator {
  constructor() {
    this.scrollEvents();
    this.clickEvents();
    this.activeSlide = 1;
    this.canGo = 1;
    this.max = 4;
  }

  scrollEvents() {

    let self = this;

    $(window).on('wheel', function(e) {
      
      if(!self.canGo) return;
      self.canGo = false;

      self.canGo = false;

      e = e.originalEvent;

      let direction = e.deltaY > 0 ? 1 : -1;
      let newSlide = self.activeSlide + direction;

      if(newSlide > self.max || newSlide < 1) {
        return;
      }

      PubSub.publish('gotoslide', {from: self.activeSlide, to: newSlide});
      self.activeSlide = newSlide;

      setTimeout(function() {
        self.canGo = true;
      },1300);
    });
  }

  clickEvents() {
    let self = this;
    $('.pagination a').on('click', function(e) {

      e.preventDefault();
      if(!self.canGo) return;

      let newSlide = $(this).data('gotoslide');
      if(newSlide !== self.activeSlide) {
        PubSub.publish('gotoslide', {from: self.activeSlide, to: newSlide});
        self.activeSlide = newSlide;
      }
    });
  }
}
