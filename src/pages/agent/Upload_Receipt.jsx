import React, { useState, useRef } from 'react';

const UploadReceipt = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload JPG, PNG or WEBP image');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be under 5MB');
            return;
        }
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleUpload = () => {
        if (!selectedFile) return;
        // TODO: API upload logic here
        console.log('Uploading:', selectedFile.name);
        // After success → reset or show message
    };

    return (
        <div className="p-6 md:p-8 lg:p-10">
            {/* Header - left aligned */}
            <div className="mb-6 max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Upload Receipt</h1>
                <p className="text-slate-500 mt-0.5 text-sm">
                    Upload receipts, proofs of deposit
                </p>
            </div>

            {/* Main Upload Area - centered */}
            <div className="flex justify-center">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm w-full max-w-2xl">
                <div className="p-4 sm:p-6 md:p-8">
                    <div
                        className={`border-2 border-dashed rounded-xl p-6 sm:p-8 md:p-10 transition-all ${
                            dragActive
                                ? 'border-blue-500 bg-blue-50'
                                : selectedFile
                                    ? 'border-green-300 bg-green-50/30'
                                    : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleChange}
                        />

                        {!previewUrl ? (
                            <div className="text-left space-y-2 sm:space-y-3">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 sm:mb-5">
                                    <span className="text-blue-600 text-2xl sm:text-3xl">↑</span>
                                </div>

                                <p className="text-slate-800 font-medium text-base sm:text-lg">
                                    Drag & drop your image here
                                </p>
                                <p className="text-slate-600 text-sm sm:text-base">
                                    or <span className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={handleBrowseClick}>
                    click to browse
                  </span>
                                </p>
                                <p className="text-slate-400 text-xs sm:text-sm pt-2">
                                    JPG, PNG, WEBP (Max 5MB)
                                </p>
                            </div>
                        ) : (
                            <div className="text-left space-y-4">
                                <img
                                    src={previewUrl}
                                    alt="Receipt preview"
                                    className="max-h-48 sm:max-h-64 w-full object-contain rounded-lg shadow-sm border border-slate-200"
                                />
                                <p className="text-slate-700 font-medium text-sm truncate">
                                    {selectedFile?.name}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Buttons - responsive */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <button
                            onClick={handleCancel}
                            className="w-full sm:w-auto px-6 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                            disabled={!selectedFile}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile}
                            className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium text-white flex items-center gap-2 justify-center ${
                                selectedFile
                                    ? 'bg-blue-600 hover:bg-blue-700 shadow-sm'
                                    : 'bg-blue-300 cursor-not-allowed'
                            }`}
                        >
                            <span>Upload</span>
</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default UploadReceipt;