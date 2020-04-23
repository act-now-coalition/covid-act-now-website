import React from 'react';

import {
  Wrapper,
  ContentWrapper,
  SidebarWrapper,
  Sidebar,
} from './StapledSidebar.style';

type StapledSidebarProps = {
  offset: number;
  sidebar: React.ReactNode;
};

type StapledSidebarState = {
  inRAF: boolean;
  lastWrapperBottom: number;
  lastStapleHeight: number;
  lastWrapperOffset: number;
  stapleWidth: string;
  stapledBottom: boolean;
  stapledTop: boolean;
};

export { SidebarLink, SectionHeader } from './StapledSidebar.style';

export default class StapledSidebar extends React.Component<
  StapledSidebarProps,
  StapledSidebarState
> {
  static defaultProps = {
    offset: 80,
  };

  t: number;
  sidebar: HTMLDivElement | null;
  wrapper: HTMLDivElement | null;
  sidebarWrapper: HTMLDivElement | null;
  constructor(props: StapledSidebarProps) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.sidebar = null;
    this.wrapper = null;
    this.sidebarWrapper = null;
    this.t = 0;
    this.state = {
      inRAF: false,
      lastWrapperBottom: 0,
      lastWrapperOffset: 0,
      lastStapleHeight: 0,
      stapleWidth: '',
      stapledBottom: false,
      stapledTop: false,
    };
    return this;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
    this.t = setInterval(this.onResize, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    clearInterval(this.t);
  }

  onScroll() {
    const lastYOffset = window.pageYOffset;
    const {
      lastWrapperBottom,
      lastWrapperOffset,
      lastStapleHeight,
      inRAF,
    } = this.state;
    const { offset } = this.props;
    console.log(lastYOffset);

    if (!inRAF) {
      this.setState({ inRAF: true });
      window.requestAnimationFrame(() => {
        if (lastYOffset >= lastWrapperBottom - offset - lastStapleHeight) {
          this.setState({ stapledBottom: true, stapledTop: false });
        } else if (lastYOffset >= lastWrapperOffset - offset) {
          this.setState({ stapledBottom: false, stapledTop: true });
        } else {
          this.setState({ stapledBottom: false, stapledTop: false });
        }
        this.setState({ inRAF: false });
      });
    }
  }

  onResize() {
    if (!this.wrapper || !this.sidebar) {
      return;
    }

    var wrapperRect = this.wrapper.getBoundingClientRect();
    var stapleRect = this.sidebar.getBoundingClientRect();
    this.setState({
      lastStapleHeight: stapleRect.height,
      lastWrapperOffset: window.pageYOffset + wrapperRect.top,
      lastWrapperBottom:
        window.pageYOffset + wrapperRect.top + wrapperRect.height,
    });
    this.onScroll();
  }

  render() {
    const { children, sidebar, offset } = this.props;
    const { stapledBottom, stapledTop } = this.state;
    const stapleWidth =
      stapledBottom || stapledTop
        ? this.sidebarWrapper
          ? window.getComputedStyle(this.sidebarWrapper).width
          : ''
        : '';

    return (
      <Wrapper
        ref={w => {
          this.wrapper = w;
        }}
      >
        <ContentWrapper>{children}</ContentWrapper>
        <SidebarWrapper
          ref={w => {
            this.sidebarWrapper = w;
          }}
        >
          <Sidebar
            stapledTop={stapledTop}
            offset={offset}
            stapledBottom={stapledBottom}
            ref={w => {
              this.sidebar = w;
            }}
            style={{
              width: stapleWidth,
            }}
          >
            {sidebar}
          </Sidebar>
        </SidebarWrapper>
      </Wrapper>
    );
  }
}
