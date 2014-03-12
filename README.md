OnsenUI-Kickstarter
===================

OnsenUI Application Starter Project - Grunt built, Jade described, Less styled, Bower wired.

I came over [OnsenUI](http://onsenui.io/) few weeks ago and this UI framework somewhat makes sense (performance, approach, extendability). Since I (and probably most front-end devs) don't use bare CSS & HTML anymore, its necessary to do a little prepwork before actual work on project. This project starter will get you up and running in no time.

#### Usage

__ Prerequisites - nodejs, npm for build process

- download or clone
- to get dependencies `npm install`
- to get components run `bower install`
- to build development version run `grunt build`
- to build production version run `grunt prod`
- to wire bower dependencies run `grunt bower`
- to run local webserver for development run `npm start` and open `127.0.0.1:8000` or `localhost:8000`

#### Features
- Jade templating
- LESS styles (output CSS optimized by CSSO)
- Linted JS
- Bower dependencies autowired to templates
- Grunt production and development builds
- Banners in built files
- Sample application skeleton included
- Dynamic file includes (grunt-include-replace)
 
#### Will be done soon
- PhoneGap Build with Grunt
- Bower dependecied concencated (or autowire require.js)
- SASS and Stylus as an alternative to Less
- Decoupling OnsenUI

#### Might be done
- Yeoman Generator
- Closure compiler integration