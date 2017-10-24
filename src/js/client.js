$(() => {

  const $website = $('.website-background');
  const $websiteContent = $('.website-hover-content');
  $websiteContent.hide();

  $website.mouseover(function() {
    $(this).children(0).show();
  });

  $website.mouseleave(function() {
    $(this).children(0).hide();
  });

});
