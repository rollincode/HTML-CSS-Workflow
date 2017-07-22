Workflow whith Gulp and Bower
===========================

It's my personal workflow to build simple HTML/CSS projects.
This boilerplate use Bootstrap-Sass and Font Awesome.

Features
--------

- Images optimisation
- Sass compilation
- CSS autoprefix
- CSS and JS minification
- Remove unused CSS rules
- Generate sourcemap files
- Livrereload


How to use it
-------------

### Install

> npm install
> bower install

### Main tasks

- **build**
Compile sass, prefix css and copy all necessary file to dist folder.
- **build:optimized**
Compile sass, prefix css, remove unused css class, minimify css and js  and copy all necessary file to dist folder.
- **watch**
Launch livereload

To run a task :
> gulp _task_name_


### Various

To use livereload, you shoud install a browser plugin : [https://github.com/vohof/gulp-livereload]


## Add front-dependencies

e.g. :
> bower install --save font-awesome