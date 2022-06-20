<?php
session_start();

function array_flatten(array $array)
{
    $return = array();
    array_walk_recursive($array, function ($a) use (&$return) {
        $return[] = $a;
    });
    return $return;
}

// echo $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

//  __ajax-crypt-id__ = the id of the crypt when the server get a cipherText
//  __ajax-crypt-path__ = the redirect url
//  __ajax-client-key__ = the client public key
$avoidWord = array("__ajax-crypt-id__", "__ajax-crypt-path__", "__ajax-client-key__", "__ajax-crypt-headers__");



if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $method = $_POST;
    $methodName = "POST";
} else if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $method = $_GET;
    $methodName = "GET";
}

// var_dqqqqqqqqqqqqqqqqqqqmp($method);

$url = $method['__ajax-crypt-path__'];
if(isset($method["__ajax-crypt-id__"])){
    $keypair = $_SESSION["keypair"][$method["__ajax-crypt-id__"]];
    unset($_SESSION["keypair"][$method["__ajax-crypt-id__"]]);
}


$finalArray = [];
foreach($method as $key => $value){
    if(in_array($key, $avoidWord)){
        continue;
    }
    $finalArray[$key] = $value;
}


if (isset($method["__ajax-crypt-id__"])) {
    function recursiveFunc($arg, $keypair) {
        if(is_string($arg)) {
            return sodium_crypto_box_seal_open(hex2bin($arg), $keypair);
        }
        return array_map(function($item) use ($keypair) {
            return recursiveFunc($item, $keypair);
        }, $arg);
    };
    $finalArray = recursiveFunc($finalArray, $keypair);
}

$ch = curl_init();

if($headers = $method["__ajax-crypt-headers__"]) {
    $headers = json_decode($headers);
    $headersPhp = [];
    foreach($headers as $key => $value){
        array_push($headersPhp, $key.": ".$value);
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headersPhp);
}

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

if($methodName == "POST"){
    $postvars = http_build_query($finalArray);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postvars);
}else if($methodName == "GET"){
    function recursive($obj, $deep = 0, $str = ""){
        if($deep == 0){
            return array_map(function($key, $val) use ($deep) {
                return recursive($val, $deep + 1, $key);
            }, array_keys($obj), array_values($obj));
        }else if(is_array($obj)){
            return array_map(function ($key, $val) use ($deep, $str) {
                return recursive($val, $deep + 1, $str . "[$key]");
            }, array_keys($obj), array_values($obj));
        }else{
            return $str."=====".$obj;
        }
    }
    $url = substr(array_reduce(array_flatten(recursive($finalArray)), function ($str, $item) {
        $array = explode("=====", $item);
        return $str . $array[0] . "=" . implode("", array_slice($array, 1)) . "&";
    }, $url . "?"), 0, -1);
}

curl_setopt($ch, CURLOPT_URL, $url);

//execute with cookie session
if (isset($_COOKIE[session_name()])) {
    curl_setopt($ch, CURLOPT_COOKIE, session_name().'='.$_COOKIE[session_name()].'; path=/; Secure; HttpOnly;');
}

session_write_close();
$result=curl_exec($ch);


if (isset($method["__ajax-client-key__"])) {
    echo bin2Hex(sodium_crypto_box_seal($result, sodium_hex2bin($method["__ajax-client-key__"])));
} else {
    echo $result;
}