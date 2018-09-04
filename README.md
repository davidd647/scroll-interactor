# What is it?

A Javascript plugin that presets interactions with primary nav and scrolling on a single page website.

## More specifically...

It does two main things.
1. If the user clicks on a link with the class described in your <strong>targets</strong> array, they will be smooth-scrolled to the corresponding $target element (also in the <strong>targets</strong> array)
2. If the user scrolls to a section on that is noted in your <strong>targets</strong> array, the link will have a class added to it (which you can use for highlighting or styling)!

#### Requires jquery

### Example:
  ### JS:

  ```javascript
  var scrollInteractor = new ScrollInteractor({
  targets: [
    { $navLink: G('.nav-home'), $target: G('#home') },
    { $navLink: G('.nav-about'), $target: G('#about') },
    { $navLink: G('.nav-contact'), $target: G('#contact') },
  ]
  });
  scrollInteractor.init();
  ```

  ### HTML:
   ```
    <ul class="scroll-interactor" style="position: fixed">

      <li>
        <a href="#">
          <span class="nav-home">Home</span>
        </a>
      </li>

      <li>
        <a href="#">
          <span class="nav-about">About</span>
        </a>
      </li>

      <li>
        <a href="#">
          <span class="nav-contact">Contact</span>
        </a>
      </li>

    </ul>

    <section id="home"></section>
    <section id="about"></section>
    <section id="contact"></section>
  ```

#### Author David Dales <david.c.dales@gmail.com>
