#!/bin/sh

npx html-minifier --collapse-boolean-attributes --collapse-whitespace --decode-entities --minify-css --minify-js --process-conditional-comments --remove-attribute-quotes --remove-comments --remove-empty-attributes --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-tag-whitespace --sort-attributes --sort-class-name --trim-custom-fragments --use-short-doctype --input-dir src/ --output-dir public/
