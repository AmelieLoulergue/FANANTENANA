<!DOCTYPE HTML>

<html lang="fr">

    <head>

        <title>Facebook Pages</title>

        <link title="defaut" type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" media="screen">
        <link title="defaut" type="text/css" rel="stylesheet" href="http://getbootstrap.com/examples/jumbotron-narrow/jumbotron-narrow.css" media="screen">

        <META CHARSET="UTF-8">
        <META HTTP-EQUIV="CONTENT-LANGUAGE" CONTENT="FR">
        <META NAME="VIEWPORT" CONTENT="WIDTH=DEVICE-WIDTH, INITIAL-SCALE=1.0">

    </head>

    <body>

        <div class="container">

            <div class="header clearfix">
                <h3 class="text-muted">Facebook Pages</h3>
            </div>

            <div class="jumbotron text-center">
                <h1>Facebook Pages</h1>
                <p class="lead">Cliquez sur l'un des boutons suivant pour afficher le fil d'actualité de la page Facebook.</p>
                <p>
                    <a class="btn btn-lg btn-success" href="?pageName=LemonCake" role="button">Lemon Cake</a>
                    <a class="btn btn-lg btn-success" href="?pageName=GoldenMoustache" role="button">Golden Moustache</a>
                </p>
            </div>

            <?php

                if(isset($_GET['pageName'])) {

            ?>
                    <div class="actus">
                        <div class="row">
                            <?php

                                $app_id = 'aaa';
                                $secret = 'bbb';

                                $token = $app_id . '|' . $secret;

                                $page = file_get_contents('https://graph.facebook.com/' . $_GET['pageName'] . '?fields=fan_count,talking_about_count,name&access_token='.$token);
                                $page = json_decode($page);

                                $pageID = $page->id;

                                $response = file_get_contents("https://graph.facebook.com/v2.6/$pageID/feed?fields=picture,message,story,created_time,shares,likes.limit(1).summary(true),comments.limit(1).summary(true)&access_token=".$token);
                                $response = json_decode($response);

                                $i = 0;

                                foreach($response->data as $data) {

                            ?>
                                    <div class="col-sm-4 text-center">
                                        <img class="img-circle" src="<?php echo isset($data->picture) ? $data->picture : 'http://placehold.it/140x140' ?>" width="140" height="140">
                                        <p><small><?php echo date('d/m/Y H:i', strtotime($data->created_time)) ?></small></p>
                                        <p><?php echo isset($data->message) ? $data->message : '' ?></p>
                                        <p>
                                            <button type="button" class="btn btn-primary btn-xs"><?php echo (isset($data->likes->summary->total_count)) ? $data->likes->summary->total_count : 0 ?> j'aime(s)</button>
                                            <button type="button" class="btn btn-success btn-xs"><?php echo (isset($data->shares->count)) ? $data->shares->count : 0 ?> partage(s)</button>
                                            <button type="button" class="btn btn-info btn-xs" style="margin-top: 5px"><?php echo (isset($data->comments->summary->total_count)) ? $data->comments->summary->total_count : 0 ?> commenaite(s)</button>
                                        </p>
                                    </div>
                            <?php

                                    $i++;

                                    if($i === 3) {

                            ?>
                                        </div>
                                        <div class="row">
                            <?php

                                        $i = 0;
                                    }

                                }

                            ?>

                        </div>
                    </div>

                    <p class="text-center loadMoreActusContainer">
                        <button data-href="<?php echo $response->paging->next ?>" type="button" class="btn btn-primary btn-lg loadMoreActus">Charger plus d'actualités</button>
                    </p>
            <?php

                }

            ?>

            <footer class="footer">
                <p>&copy; 2016 Facebook Pages.</p>
            </footer>

        </div>

        <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
        <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="http://momentjs.com/downloads/moment-with-locales.js"></script>
        <script type="text/javascript">
            jQuery(function($){

                $(document).on('click', '.loadMoreActus', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var that = this;

                    href = $(that).attr('data-href');

                    console.log($(that).attr('data-href'));

                    $(that).prop('disabled', true);

                    $.ajax({
                        url: href,
                        type: 'get',
                        success: function(response) {
                            var $row = $("<div/>").addClass('row');
                            var i = 0;
                            $.each(response.data, function(index, data) {
                                try {
                                    $row.append(
                                        $("<div/>").addClass('col-sm-4 text-center').append(
                                            $("<img/>").addClass('img-circle').attr('src', (data.picture !== undefined) ? data.picture : 'http://placehold.it/140x140').width(140).height(140),
                                            $("<p/>").html(
                                                $("<small/>").text(moment(data.created_time).format('DD/MM/YYYY HH:mm'))
                                            ),
                                            $("<p/>").text(
                                                (data.message !== undefined) ? data.message : ''
                                            ),
                                            $("<p/>").append(
                                                $("<button/>").attr('type', 'button').addClass('btn btn-primary btn-xs').append(
                                                    (data.likes !== undefined) ? data.likes.summary.total_count : 0,
                                                    " j'aime(s)"
                                                ),
                                                $("<button/>").attr('type', 'button').addClass('btn btn-success btn-xs').css('margin-left', '5px').append(
                                                    (data.shares !== undefined) ? data.shares.count : 0,
                                                    " partage(s)"
                                                ),
                                                $("<button/>").attr('type', 'button').addClass('btn btn-info btn-xs').append(
                                                    (data.comments !== undefined) ? data.comments.summary.total_count : 0,
                                                    " commenaite(s)"
                                                )
                                            )
                                        )
                                    );
                                } catch(Err) {
                                    console.log(Err);
                                    console.log(data);
                                }

                                i++;

                                if(i === 3) {
                                    $(".actus").append($row);
                                    $row = $("<div/>").addClass('row');
                                    i = 0;
                                }
                            });

                            $(".actus").append($row);

                            if(response.data.length === 25) {
                                $(".loadMoreActusContainer").html(
                                    $("<button/>").attr('data-href', response.paging.next).attr('type', 'button').addClass('btn btn-primary btn-lg loadMoreActus').text("Charger plus d'actualités")
                                );
                            } else {
                                $(".loadMoreActusContainer").html('');
                            }
                        },
                        error: function(response) {
                            alert('ERROR LOAD MORE ACTUS');
                        }
                    });
                });

            });
        </script>

    </body>

</html>