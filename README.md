# Framework7 with Angular 1.x and TypeScript demo app

A demo application built on top of **Framework7**, **AngularJS**, **SASS** and **TypeScript**. Feel free to download, modify, fork or comment. This app will list upcoming and current movies from theaters and give you detailed information

### Framework7 version compatibility
- V1: Yes
- V2: No

## Important! Read this first!
This example **is not best practice** on how to use Framework7, it’s more of an **experiment** to see how it works with Angular and TypeScript. Framework7 has an own templating engine called Template7 (and also now supports [Vue](http://framework7.io/vue) and [React](http://framework7.io/react)), so Angular is not mandatory. The important part is that F7 is designed to work with JavaScript, rather than TypeScript. So, if you’re new to Framework7, do not assume that this example is the way you should create F7 apps! It was an experiment to see what happens if you combine these technologies.

Also, please keep in mind that this is an old demo based on Angular 1.x. If you like Angular, then I rather recommend to use Ionic since it fully supports Angular2. If you want to use Framework7, then use [Framework7-Vue](http://framework7.io/vue) or [Framework7-React](http://framework7.io/react).

If you feel adventurous enough to dive into this experiement read on :-)

## Demo
Check out working demo here: http://www.timo-ernst.net/misc/f7angulardemo

![Smartphone portrait mode](http://www.timo-ernst.net/wp-content/uploads/2015/04/Foto-02.04.15-01-44-28-169x300.png)

## How to build
1. Install npm (http://www.npmjs.com)
2. Install Grunt (http://www.gruntjs.com)
3. cd to project folder
4. From cmd run `npm install`
5. Then call `grunt compile`
6. Copy the content of `/build` to htdocs of your webserver

## How to do changes

Go to `src` folder and edit the following files:

- HTML: `.dev.html` files
- Styles: `.sass` files
- Scripts: `.ts` files (**Type**script, not JavaScript!)

Then call `grunt compile` again and check the result in `/build` folder.

### Source code explanation:
Detailed explanation of the source code: http://timo-ernst.net/blog/2015/04/02/experiment-an-iphone-app-built-with-framework7-typescript-and-angularjs/

## Template

This app is based on top of this template: https://github.com/valnub/Framework7-Typescript-Template

### Alternative, easier template

For some people the template mentioned above is a little to complicated because it relies on npm and grunt. If you want an alternative with just pure html, css and javascript without a build process involved you can try this alternative: https://github.com/valnub/Framework7-Pure-Angular-Template or watch my video screencast tutorial: http://www.timo-ernst.net/blog/2015/11/05/video-screencast-how-to-use-framework7-with-angularjs/
