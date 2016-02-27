# Principle

> Ceyd is inspired by BEM. It forces you to use only classes, with very little if any selector hierarchy.
> It scopes everything in [components](#components) to avoid regression as much as possible.

## Components

### Writing norm

- __lowercase__
- Words separated by `-`

Should match: `^[a-z]+(?:-[a-z]+)*$` 

> A component should have an object name (modal, message, form) 

### Examples

```SCSS
.button {}
.button-bar {}
.dashboard-message {}
.flash-message {}
.dashboard-form {}
```

## Children

### Writing norm

- Prefixed by the main class and `_`
- __lowercase__
- Words separated by `-`

Should match: `^(?:[a-z]+(?:-[a-z]+)*)(?:_(?:[a-z]+(?:-[a-z]+)*))+$` 

> A child should also have an object name, but more precise (content, icon, field).

### Examples

```SCSS
.button_icon {}
.button-bar_part {}
.dashboard-message_emphasis {}
.flash-message_button {}
.dashboard-form_field {}
```

## Modifiers

### Writing norm

- Start with `--`
- __lowercase__
- Words separated by `-`

Should match: `^--[a-z]+(?:-[a-z]+)*$` 

> A modifier should have an adjective name (active, emphased, disabled)

---

__Note:__ On Safari, the selector `.--class` is not recognized, so you must use `\.--class` or the provided [helper](#include-modifiermy-modifier) 


### Modifiers scoping

Every modifier must be declared in the context of a component.

You __NEVER__ declare a modifier globally, even if it could look good, it will sooner or later generate a regression.

The modifier should __ALWAYS__ be linked to a component or his child `.profile-card.--rounded` or `.profile-card_image.--rounded`

### Examples

```SCSS
.button.\--primary {}
.button-bar_part.\--centered {}
.flash-message.\--info {}
```

# Reset scope

To avoid frustrating inheritance like font-size or text-align, every component must reset cascading styles on its declaration. Ceyd CSS provide a silent class (`%scope-reset`) and a [helper](#include-componentmy-component) for this purpose.

# Conventions

## Folder hierarchy

- One file with all global variables.
- One file with all global mixins.
- Multiple files, in root sass folder, for compilation
- One folder per theme (Application, Member, Dashboard, Chat)
- One folder for abstract enough elements (buttons, modals, forms, titles)

```
\sass\
	Config\
		_reset.scss // ONLY GLOBAL STYLE !!!
		_variables.scss
	Tools\
		_functions.scss
		_mixins.scss
		_ceyd-component-helpers.scss
	Generic\
		_modal.scss
		_button.scss
		_title.scss
	Dashboard\
		[...]
	Investment\
		[...]
	Member\
		[...]
	Chat\
		[...]
	dashboard.scss
	member.scss
	dashboard.scss
	chat.scss
```

## Naming conventions

### File name

__Every component has its own file__ and is never split in separate files. A component named `call-to-action` will be in the `_call-to-action.scss` file
It will allow us to use a component easily in multiple builds (aka compiled css files).

### Component name

Don't use short names like `btn` for `button` or `db` for `dashboard`. 
It may seem obvious to you but it adds complexity reading the code and only make you win 5 seconds of dev.
Challenge when you come back on your code 6 months after writing it. Is `db` for `dashboard`, `database` or `debit` ?

> Try to keep every name (component, child or modifier) as semantic as possible.

### Variable name

> __Note :__ For social medias colors or any other non owned properties, refer to [constants](#constant-name)

#### Writing

- __lowercase__
- Words separated by `-`

#### Structure

_For global color variables: $[color]-[name]_
```SCSS
$grey-mine: #222;
$green-truquoise: #1abc9c;
$purple-amethyst: #9b59b6;
$red-alizarin: #e74c3c;
```

_For scoped color variables: $[modifier|default]-[which]_
```SCSS
$default-text-color: $grey-mine;
$default-border-color: $grey-alabaster;
$error-background-color: $red-alizarin;
$info-color: $blue-sky;
```

_For global breakpoint variables: $breakpoint-[device]-[min|max]_
```SCSS
$breakpoint-mobile-min: 380px;
$breakpoint-mobile-max: ($breakpoint-mobile-min - 1);
```

_For scoped breakpoint variables: $breakpoint-[use]-[min|max]_
```SCSS
// Context use name : global name
$breakpoint-menu-min: $breakpoint-mobile-min;
$breakpoint-menu-max: $breakpoint-mobile-max;
```

_For other global vars_: $base-[what]
```SCSS
$base-title-color: $grey-smoke;
$base-border-color: $grey-alabaster
$base-border: 1px solid $base-border-color;
```
> Be carefull with these, Don't use too much global vars or you'll end with an unmanageable variable file 

### Constant name

> Constants doesn't have to be locally scoped. they can be used directly inside the component.

#### Writing

- __uppercase__
- Words separated by `_`

#### Structure

_any: $[context]-[which]_
```SCSS
$SOCIAL_LINKEDIN_MAIN_COLOR: #0077b5
$SOCIAL_TWITTER_MAIN_COLOR: #55acee
```

## Blank lines, indentation and ordering

No blank line at the start of the file.
Never more than 1 consecutive blank line.
One blank line around declarations _(@include, .class, &:hover)_.
One blank line around scope variables.
One blank line around mixin variables.

Indented with 2 spaces, no tab.

A component come as follows:

```SCSS
@include component(node) {

  $var = 'Scoped variable'
  $var = 'Scoped variable'
  $var = 'Scoped variable'

  @mixin scopedMixin() {

    // [...]
  }

  padding: 1em;
  margin: 1em auto;
  color: $var;

  mixin() // Mixin usage that edit styles

  mixin() // Mixin usage that edit styles

  @include modifier() {

    // [...]
  }

  @include modifier() {

    // [...]
  }

  mixin() // Mixin usage that generate modifiers

  @include child() {

    // [...]
  }

  @include child() {

    // [...]
  }

  mixin() // Mixin usage that generate child(ren)
}


```

## Variable scoping

To break dependency between components as much as possible. 
Every global variable that a component uses must be affected to a local one, even if used only once.

__Example:__ 

__variables.scss_
```SCSS
$blue-lagoon: #00f;
$white-snow: #fff;

```
_Application/_cover.scss_
```SCSS
@include component(cover) {

  $background-color: $blue-lagoon;
  $text-color: $white-snow;

  [...]
  padding: 1em;
  margin-top: 1em;
  background-color: $background-color;
  color: $text-color;
}
```

The other benefit is that, when opening a file, you know really fast which color do what, just by reading, and can edit them easily.

## Mixins scoping

When declaring a mixin, you have 2 choices.

- Inside the components file (Should be preferred)
- Inside the global mixins file (Only if abstract enough

## Helpers

Ceyd provide helpers and a very basic style. They should be used as mush as possible

### @include component(my-component)

It will generate the class name `.my-component` and automatically add the component to the [reset scope](#reset-scope).

_SCSS_
```SCSS
@include component(flash-message) {
	
  padding: .5em 1.5em;
  border-radius: 3px;
}
```
_CSS_
```CSS
.other, .another, .another-again, .flash-message {
  display: block;
  color: #222;
  direction: ltr;
  font-family: Roboto, sans-serif;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 1;
  text-align: left;
  text-indent: 0;
  text-transform: none;
  visibility: visible;
  white-space: normal;
  word-spacing: normal;
}

.flash-message {
  padding: .5em 1.5em;
  border-radius: 3px;
}
```

### @include child(my-child)

It will generate a class name based on the parent. This helper also throw a compiling error when used in the root scope (if it does not have a parent).

_SCSS_
```SCSS
@include component(flash-message) {

  padding: .5em 1.5em;
  border-radius: 3px;

  @include child(icon) {
	
    font-size: 1.5em;
    vertical-align: middle;
  }
}
```
_CSS_
```CSS
.other, .another, .another-again, .flash-message {
  display: block;
  color: #222;
  direction: ltr;
  font-family: Roboto, sans-serif;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 1;
  text-align: left;
  text-indent: 0;
  text-transform: none;
  visibility: visible;
  white-space: normal;
  word-spacing: normal;
}

.flash-message {
	padding: .5em 1.5em;
	border-radius: 3px;
}

.flash-message_icon {
	font-size: 1.5em;
	vertical-align: middle;
}
```

### @include modifier(my-modifier)

It will generate a class name based on the parent. This helper also throw a compiling error when used in the root scope (if it does not have a parent).

_SCSS_
```SCSS
@include component(flash-message) {
	
  $error-background-color: $red-blood;
  $info-background-color: $blue-ocean;

  padding: .5em 1.5em;
  border-radius: 3px;

  @include modifier(error) {
	
    background-color: $error-background-color;
  }

  @include modifier(info) {
	
    background-color: $info-background-color;
  }
}
```
_CSS_
```CSS
.other, .another, .another-again, .flash-message {
  display: block;
  color: #222;
  cursor: default;
  direction: ltr;
  font-family: Roboto, sans-serif;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 1;
  text-align: left;
  text-indent: 0;
  text-transform: none;
  visibility: visible;
  white-space: normal;
  word-spacing: normal;
}

.flash-message {
	padding: .5em 1.5em;
	border-radius: 3px;
}

.flash-message.\--error {
	background-color: #900;
}

.flash-message.\--info {
	background-color: #009;
}
```

# How to use

Keep up to date a page where you can see all components in use.
Also, list all modifier with the result.

# See also

- [When to use class, id, attributes ?](SeeAlso/class-id-attr.md)
- [Documentation](SeeAlso/documentation.md)
- [Prefix](SeeAlso/prefix.md)
