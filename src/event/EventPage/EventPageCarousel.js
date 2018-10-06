/**
 * CSS ONLY SUPPORTS TWO ELEMENTS IN THE CAROUSEL :(
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./EventPageCarousel.css";

class EventPageCarousel extends Component {
  static propTypes = {
    carouselItems: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.node.isRequired,
        name: PropTypes.string.isRequired
      })
    )
  };

  static defaultProps = {
    carouselItems: []
  };

  state = {
    activeIndex: 0,
    hideBanners: false,
    translateLeft: false,
    translateRight: false
  };

  handleClickBanner = i => {
    this.setState({
      translateRight: i > 0,
      translateLeft: i < 0,
      hideBanners: true
    }, () => {
      setTimeout(() => {
        this.setState(prevState => ({
          activeIndex: prevState.activeIndex + i,
          hideBanners: false
        }));
      }, 500);
    });
  };

  getShouldShowLeftBanner = () => !this.state.hideBanners && !!this.props.carouselItems[this.state.activeIndex - 1];

  getShouldShowRightBanner = () => !this.state.hideBanners && !!this.props.carouselItems[this.state.activeIndex + 1];

  getLeftBannerName = () =>
    this.getShouldShowLeftBanner() &&
    `< ${this.props.carouselItems[this.state.activeIndex - 1].name}`;

  getRightBannerName = () =>
    this.getShouldShowRightBanner() &&
    `${this.props.carouselItems[this.state.activeIndex + 1].name} >`;

  render() {
    return (
      <div className="EventPageCarousel">
        <div
          className={cx("EventPageCarousel-banner--left", {
            "EventPageCarousel-banner-hidden": !this.getShouldShowLeftBanner()
          })}
          onClick={() => this.handleClickBanner(-1)}
        >
          {this.getLeftBannerName()}
        </div>
        <div
          className={cx("EventPageCarousel-banner--right", {
            "EventPageCarousel-banner-hidden": !this.getShouldShowRightBanner()
          })}
          onClick={() => this.handleClickBanner(1)}
        >
          {this.getRightBannerName()}
        </div>
        <div
          className={cx("EventPageCarousel-content", {
            "EventPageCarousel-content--translateLeft": this.state
              .translateLeft,
            "EventPageCarousel-content--translateRight": this.state
              .translateRight
          })}
        >
          {this.props.carouselItems.map(({ node, name }, i) => (
            <div
              key={i}
              className="EventPageCarousel-item"
              id={`EventPageCarousel-item--${i}`}
            >
              {node}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default EventPageCarousel;
