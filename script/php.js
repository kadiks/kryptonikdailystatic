var fs = require('fs');
var path = require('path');

var inputPath = path.normalize(__dirname + '/../index.html');
var outputPath = path.normalize(__dirname + '/../dist/daily.php');

var htmlContent = fs.readFileSync(inputPath, 'utf8');
htmlContent = htmlContent.replace(new RegExp('src="', 'g'), 'src="<?php bloginfo(\'template_directory\'); ?>/');
htmlContent = htmlContent.replace(new RegExp('rel="stylesheet" href="css/', 'g'), 'rel="stylesheet" href="<?php bloginfo(\'template_directory\'); ?>/css/');
htmlContent = htmlContent.replace(new RegExp('</head>', 'g'), '  <?php googleanalytics(); wp_site_icon(); ?>' + "\n" + '</head>');
htmlContent = htmlContent.replace(new RegExp('{users : 33, projects : 7, developers : 16}', 'g'), '<?php echo $jsonStr; ?>');
htmlContent = htmlContent

var wpTpl = `<?php
/**
 * Template name: daily
 *
 * The template for displaying daily data company
 *
 * @package Hew
 */
?>
<?php
  $jsonStr = file_get_contents(getenv(HERMES_DAILY_JSON_LOCATION));
  $jsonStr = str_replace("\\r", "", str_replace("\\n", "", $jsonStr));
  /*$json = json_decode($jsonStr);
  $users = $json['users'];
  $projects = $json['projects'];
  $developers = $json['developers'];*/
?>
`;

htmlContent = wpTpl + htmlContent;

fs.writeFileSync(outputPath, htmlContent, 'utf8');
