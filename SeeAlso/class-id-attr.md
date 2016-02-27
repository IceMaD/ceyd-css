# When to use class, id, attributes ?

## Classes

__Classes are only for style__ 
They should not be linked to any javascript interaction

Every HTML tag must only have one class ([main](#main-class) or [child](#child-class)), and 0 to n [modifiers](#modifier-class).
Once it has a main class, the html tag is called a component.

## IDs

__ID are meant to be used for anchors__ 
They should neither be linked to any style nor javascript interaction

## Attributes

__attributes are used for behavior__ 
They should not be linked to any style

[HTML5](http://www.w3.org/TR/2011/WD-html5-20110525/elements.html#embedding-custom-non-visible-data-with-the-data-attributes) natively use them to define behaviors. And it also advise us to bound data or config with `data-` attributes.
