pragma solidity ^0.4.21;
/**
Footmark
 */
contract Footmark {
    struct Log {
        uint time;
        string text;
    }
    mapping (address=>mapping(address=>Log)) private logs;
   
    event LeaveMessage(address indexed from, address indexed to, string text);

    function Footmark() public {
        
    }
    
    // Leave a message to somebody
    function leaveMessage(string text,address to) public returns(uint time) {
        bytes memory textBytes = bytes(text);
        require(textBytes.length > 0 && textBytes.length < 100);
        time = now;
        logs[msg.sender][to] = Log(time, text);
        emit LeaveMessage(msg.sender, to, text);
        return time;
    }
    
    // Leave a message to myself
    function enter(string text) public returns(uint time) {
        return leaveMessage(text, msg.sender);
    }
    
    // Lookup message from somebody
    function lookupFrom(address from) public view returns(uint time, string text) {
        return (logs[from][msg.sender].time,logs[from][msg.sender].text);
    }
    
    // Lookup message from myself to somebody
    function lookupTo(address to) public view returns(uint time, string text) {
        return (logs[msg.sender][to].time,logs[msg.sender][to].text);
    }
}