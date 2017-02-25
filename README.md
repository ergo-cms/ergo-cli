# Ergo Command Line

This is the command-line edition of [ergo-cms](https://ergo-cms.github.io). Please visit [ergo-cms.github.io](https://ergo-cms.github.io) for more information.


[![npm Package](https://img.shields.io/npm/v/ergo-cli.svg)](https://www.npmjs.org/package/ergo-cli)
[![build status](https://secure.travis-ci.org/ergo-cms/ergo-cli.svg)](http://travis-ci.org/ergo-cms/ergo-cli)



## Installation and Getting Started

Ergo supports version 4.x and 6.x and is regularly tested on them.

Try playing with the skeleton file:

``` npm install ergo -g
ergo init Blog
cd Blog
ergo view -b -w
```

Don't like the theme? Try Smart Bootstrap's 'Clean Blog' (or [view more here](https://ergo-cms.github.io/themes)):

``` ergo theme install clean-blog
ergo view -c -b -w
```

Switch back the original theme? 

``` ergo theme switch ergo-simple
ergo view -c -b -w
```

Don't want to install globally? No problem:

``` git clone https://github.com/ergo-cms/ergo-skel.git Blog
cd Blog
npm install
npm run ergo -- view -b -w
```

Just use `npm run ergo --  ...` in place of running `ergo ...` for all commands!

## Need help with commands and parameters?

Just type `ergo --help` or `ergo [command] --help`.



