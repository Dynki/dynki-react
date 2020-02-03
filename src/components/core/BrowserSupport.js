import React from 'react';
import { Button, Card, Result } from 'antd';
import { detect } from 'detect-browser';
import cmp from 'semver-compare';
import styles from 'styled-components';

const Container = styles.div`    
    height: 100%;
    background-color: #BDB9B8;
    min-height: 740px;
`;

const determineBrowserSupport = (browser) => {
    const supported = {
        chrome: '4.10',
        edge: '6',
        'edge-chromium': "81.0.403",
        firefox: '19.5',
        ie: '14',
        opera: '10.0',
        safari: '10.2',
    }

    if (!browser) {
        return false;
    }
    else {
        if (!supported[browser.name]) {
            return false;
        } else {
            let browserVersion = supported[browser.name];
            if (cmp(browser.version, browserVersion) < 0) {
                return false;
            } else {
                return true;
            }
        }
    }
}

export const detectBrowser = () => {
    const browser = detect();

    return {
        ...browser,
        message: '',
        supported: determineBrowserSupport(browser)
    }
}

const BrowserSupport = () => {
    return (
        <Container>
            <Card>
                <Result
                    status="warning"
                    title="We do not support this browser, please upgrade to a modern web browser"
                    extra={
                        <a href="https://www.google.co.uk/chrome/" target="blank">
                            <Button type="primary" key="console" size="large">
                                Upgrade To Chrome
                            </Button>
                        </a>
                    }
                />
            </Card>
        </Container>
    )
}

export default BrowserSupport;