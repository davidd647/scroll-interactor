A Javascript plugin that presets interactions with primary nav and scrolling
on a single page website.

 ####author David Dales <david.c.dales@gmail.com>

 ####requires jquery

 ###example
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

 ###example:
  var scrollInteractor = new ScrollInteractor({
    targets: [
      { $navLink: G('.nav-home'), $target: G('#home') },
      { $navLink: G('.nav-about'), $target: G('#about') },
      { $navLink: G('.nav-contact'), $target: G('#contact') },
    ]
  });
  scrollInteractor.init();
