%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_nn
from starkware.starknet.common.messages import send_message_to_l1

// Total number of user posted
@storage_var
func user_articles_num(user: felt) -> (num: felt) {
}

// Each post's CID of the user, len should be 67
@storage_var
func user_articles_cid(user: felt, id: felt, index: felt) -> (cid: felt) {
}

@view
func get_articleURI{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user: felt, id: felt
) -> (articleURI_len: felt, articleURI: felt*) {
    let (array) = alloc();
    let (_articleURI_len, _articleURI) = _read_articleURI(user, id, 0, array);
    return (_articleURI_len, _articleURI);
}

@view
func _read_articleURI{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user: felt, id: felt, array_len: felt, array: felt*
) -> (array_len: felt, array: felt*) {
    let (val) = user_articles_cid.read(user, id, array_len);
    if (val == 0) {
        return (array_len, array);
    }
    assert array[array_len] = val - 1;
    return _read_articleURI(user, id, array_len + 1, array);
}

@external
func set_articleURI{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user: felt, id: felt, uri_len: felt, uri: felt*
) {
    if (uri_len == 0) {
            return ();
    }
    tempvar new_len = uri_len - 1;
    user_articles_cid.write(user, id, new_len, uri[new_len] + 1);
    set_articleURI(user, id, new_len, uri);
    return ();
}

@external
func upload_post{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user: felt, id: felt, uri_len: felt, uri: felt*
) {
    let now_num = user_articles_num.read(user);
    user_articles_num.write(user, now_num + 1);
    set_articleURI(user, id, uri_len, uri);
    return ();
}