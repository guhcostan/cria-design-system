import React from 'react';
import ScrollToTop from 'react-scroll-up';

import locales from './locales';
import pages from './pages';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    window.addEventListener("hashchange", () => {
      window.scrollTo(0, 0);

      this.setPage();
    }, false);
  }

  componentDidMount() {
    this.setPage(() => {
      if (!this.state.locale) {
        this.setLocale(localStorage.getItem('ELEMENT_LANGUAGE') || 'pt-BR');
      }
    });
  }

  getLocale(key) {
    const map = locales[this.state.locale] || {};

    return key.split('.').reduce((a, b) => {
      const parent = map[a];

      if (b) {
        return (parent || {})[b];
      }

      return parent;
    });
  }

  setLocale(locale) {
    window.location.hash = `/${locale}/${this.state.page}`;
  }

  getPage() {
    const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);

    if (routes) {
      if (locales.hasOwnProperty(routes[1])) {
        this.setState({ locale: routes[1] }, () => {
          localStorage.setItem('ELEMENT_LANGUAGE', this.state.locale);
        });
      }

      return routes[2];
    }

    return 'quick-start';
  }

  setPage(fn) {
    this.setState({ page: this.getPage() }, fn);
  }

  getComponent(page) {
    this.components = this.components || Object.assign(Object.values(pages.components).reduce((a, b) => {
      return Object.assign(a, b);
    }, {}), pages.documents);

    const result = this.components[page];

    if (result) {
      return React.createElement(result.default, {
        locale: {
          show: this.getLocale('markdown.show'),
          hide: this.getLocale('markdown.hide')
        }
      });
    }
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <h1>
              <img src={require('./assets/logo.png')} />
            </h1>
            <ul className="nav">
              <li className="nav-item">
                <a href={`https://www.criainovacao.com.br`} target="_blank" rel="noopener noreferrer">Site</a>
              </li>
              <li className="nav-item">
                <a className="active">Componentes</a>
              </li>
              <li className="nav-item">
                <a href={`http://criadesign.ti.lemaf.ufla.br`} target="_blank" rel="noopener noreferrer">Guia Completo</a>
              </li>
            </ul>
          </div>
        </header>
        <div className="main container">
          <nav className="side-nav">
            <ul>
              <li className="nav-item">
                <a>{this.getLocale('misc.development')}</a>
                <ul className="pure-menu-list sub-nav">
                  {
                    Object.keys(pages.documents).map(page => {
                      return (
                        <li className="nav-item" key={page}>
                          <a href={`#/${this.state.locale}/${page}`} className={page === this.state.page ? 'active' : ''}>{this.getLocale(`page.${page}`)}</a>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
              <li className="nav-item">
                <a>{this.getLocale('misc.components')}</a>
                {
                  Object.keys(pages.components).map(group => {
                    return (
                      <div className="nav-group" key={group}>
                        <div className="nav-group__title">{group}</div>
                        <ul className="pure-menu-list">
                          {
                            Object.keys(pages.components[group]).map(page => {
                              return (
                                <li key={page} className="nav-item">
                                  <a href={`#/${this.state.locale}/${page}`} className={page === this.state.page ? 'active' : ''}>{this.getLocale(`page.${page}`)}</a>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  })
                }
              </li>
            </ul>
          </nav>
          <div className="content">
            { this.getComponent(this.state.page) }
            <ScrollToTop showUnder={210}>
              <div className="page-component-up">
                <i className="el-icon-caret-top"/>
              </div>
            </ScrollToTop>
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="footer-main">
              <p className="footer-main-title">Cria Design React</p>
              <a href="https://github.com/criatecnologiainovacao/cria-design-system/issues" target="_blank" rel="noopener noreferrer" className="footer-main-link">{this.getLocale('misc.feedback')}</a>
              <a href="https://github.com/criatecnologiainovacao/cria-design-system/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="footer-main-link">{this.getLocale('misc.contribution')}</a>
            </div>
            <div className="footer-social">
              <a href="//github.com/criatecnologiainovacao/cria-design-system" target="_blank" rel="noopener noreferrer">
                <img src={require('./assets/github.png')} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
