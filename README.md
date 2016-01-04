# Ceyd CSS

## When to use class, id, attributes ?

### Classes

__Classes are only for style__ 
They should not be linked to any javascript interaction

Every HTML tag must only have one class ([main](#main-class) or [child](#child-class)), and 0 to n [modifiers](#modifier-class).
Once it has a main class, the html tag is called a component.

### IDs

__ID are meant to be used for anchors__ 
They should neither be linked to any style nor javascript interaction

### Attributes

__attributes are used for behavior__ 
They should not be linked to any style

[HTML5](http://www.w3.org/TR/2011/WD-html5-20110525/elements.html#embedding-custom-non-visible-data-with-the-data-attributes) natively use them to define behaviors. And it also advise us to bound data or config with `data-` attributes.
 
## Regression

### Component independance

Every component must be totally independant.
According to this, every component has its own file and never splitted in separate files.
It will allow us to use a component easily in multiple builds (aka compiled css files).

### Modifiers scoping

Every [modifier](#modifier-class) must be declared in the context of a component.

You __NEVER__ declare a modifier globally, even if it could look good, it will sooner or later generate a regression.

The modifier should be linked to a component or his child `.profile-card.--rounded` or `.profile-card_image.--rounded`

### Avoid unwanted inheritance

To avoid frustrating inheritance like font-size or text-align, every component must reset [cascading styles](#cascading-styles) on its declaration.

### Prefix (optional)

To avoid conflict and regression, classes should be prefixed by some letters, like the company name. 
Following this advice, a classe like `.profile-card` of a comany named _Google_ would look like `.gogl-profile-card` 

## Avoid legacy
 
Document every usage of the component on top of the file.
Every file where the class appear must be listed.
So when you remove an component, you remove it's usage in the documentation, if there is no more usage, you can easily remove the file (aka all the component style). No more legacy !

## How to use

Keep up to date a page where you can see all components in use.
Also list all modifier with the result.

## Classes

### Main class:

- __lowercase__
- Words separated by -

Should match: `^[a-z]+(?:-[a-z]+)*$` 

### Child class:

- Prefixed by the main class and _
- __lowercase__
- Words separated by -

Should match: `^(?:[a-z]+(?:-[a-z]+)*)(?:_(?:[a-z]+(?:-[a-z]+)*))+$` 

### Modifier class:

- Start with `--`
- __lowercase__
- Words separated by -

Should match: `^--[a-z]+(?:-[a-z]+)*$` 

## Annexes

### References

#### Cascading styles

- color
- cursor
- direction
- font-family
- font-size
- font-style
- font-weight
- letter-spacing
- line-height
- text-align
- text-indent
- text-transform
- visibility
- white-space
- word-spacing
