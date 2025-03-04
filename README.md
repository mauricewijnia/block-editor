<p align="center"><img height="300px" src="./logo-text.svg" alt="logo"></p>

# Block Editor

This package is a Work In Progress. It aims to seperate the Javascript frontend from [Laraberg](https://github.com/VanOns/laraberg) so it can be maintained seperately, and maybe serve as a starting point for other backend implementations.

## Usage

To use the editor simply create a input or textarea element and use it to initalize it like this:

```js
import { initializeEditor } from 'van-ons/block-editor'

const element = document.querySelector('#content')
initializeEditor(element)
```

## Documentation

Please see the [documentation] for detailed information about installation and usage.

## Contributing

Please see [contributing] for more information about how you can contribute.

## Changelog

Please see [changelog] for more information about what has changed recently.

## Upgrading

Please see [upgrading] for more information about how to upgrade.

## Security

Please see [security] for more information about how we deal with security.

## Credits

We would like to thank the following contributors for their contributions to this project:

- [All Contributors][all-contributors]

## License

The scripts and documentation in this project are released under the [MIT License][license].

---

<p align="center">
    <a href="https://van-ons.nl/" target="_blank">
        <img src="https://opensource.van-ons.nl/files/cow.png" width="50" alt="Logo of Van Ons">
    </a>
</p>

[documentation]: docs/README.md#contents
[contributing]: CONTRIBUTING.md
[changelog]: CHANGELOG.md
[upgrading]: UPGRADING.md
[security]: SECURITY.md
[all-contributors]: ../../contributors
[license]: LICENSE.md
