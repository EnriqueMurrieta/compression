import heapq
import os
import pickle
from collections import OrderedDict

class Node:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.freq < other.freq

def build_frequency_table(text):
    frequency_table = {}
    for char in text:
        if char in frequency_table:
            frequency_table[char] += 1
        else:
            frequency_table[char] = 1
    return frequency_table

def build_prefix_code(node, prefix_code_dict, prefix_code=''):
    if node is None:
        return
    if node.char is not None:
        prefix_code_dict[node.char] = prefix_code
    build_prefix_code(node.left, prefix_code_dict, prefix_code + '0')
    build_prefix_code(node.right, prefix_code_dict, prefix_code + '1')

def compress_file(input_file, output_file):
    # Read input file
    with open(input_file, 'r') as file:
        text = file.read()

    # Build frequency table
    frequency_table = build_frequency_table(text)

    # Build Huffman tree
    nodes = [Node(char, freq) for char, freq in frequency_table.items()]
    heapq.heapify(nodes)

    while len(nodes) > 1:
        left_child = heapq.heappop(nodes)
        right_child = heapq.heappop(nodes)
        merged_node = Node(None, left_child.freq + right_child.freq)
        merged_node.left = left_child
        merged_node.right = right_child
        heapq.heappush(nodes, merged_node)

    huffman_tree = nodes[0]

    # Build prefix code dictionary
    prefix_code_dict = OrderedDict()
    build_prefix_code(huffman_tree, prefix_code_dict)

    # Compress text
    compressed_text = ''.join(prefix_code_dict[char] for char in text)

    # Calculate padding bits
    padding_bits = 8 - len(compressed_text) % 8
    if padding_bits == 8:
        padding_bits = 0

    # Add padding bits to the compressed text
    compressed_text += '0' * padding_bits

    # Convert compressed text to bytes
    compressed_bytes = bytearray()
    for i in range(0, len(compressed_text), 8):
        byte = compressed_text[i:i + 8]
        compressed_bytes.append(int(byte, 2))

    # Combine codebook and padding information
    codebook = {
        'prefix_code_dict': prefix_code_dict,
        'padding_bits': padding_bits,
        'compressed_bytes': compressed_bytes
    }

    # Write combined data to output file
    with open(output_file, 'wb') as file:
        pickle.dump(codebook, file)

# Usage example
input_file = "input.txt"
output_file = "compressed.pkl"
compress_file(input_file, output_file)
