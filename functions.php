<?php
/*----------------------------------------------------------*/
// 初期設定
/*----------------------------------------------------------*/
function my_setup()
{
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'my_setup');

function my_script_init()
{
    wp_deregister_script('jquery');
    // wp_enqueue_style('swiper-css', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/9.0.3/swiper-bundle.min.css', array(), false, 'all');
    // wp_enqueue_script('swiper', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/9.0.3/swiper-bundle.min.js', array(), '9.0.3', true);
    wp_enqueue_style('style-css', get_template_directory_uri() . '/css/style.css?' . filemtime(get_template_directory() . '/css/style.css'), array(), false, 'all');
    // wp_enqueue_script('myjquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js', array(), '3.6.3', true);
    // wp_enqueue_script('script-js', get_template_directory_uri() . '/js/script.js', array('myjquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'my_script_init');

/*----------------------------------------------------------*/
// 404リダイレクト
/*----------------------------------------------------------*/
function is404_redirect()
{
    if (is_404() || is_page_template('pages/top.php')) {
        wp_safe_redirect(home_url('/'), 301);
        exit();
    }
}
add_action('template_redirect', 'is404_redirect');
